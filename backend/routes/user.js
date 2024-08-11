const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const bcrypt = require("bcrypt");

const router = express.Router();

const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (userId) {
    return res.json({
      message: "User is logged in",
      firstName: req.firstName,
      lastName: req.lastName,
    });
  } else
    return res.status(404).json({
      message: "User not logged in",
    });
});

//Signup route
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await bcrypt.hash(req.body.password, 10),
  });
  //   var hashedPassword = await user.createHash(req.body.password);
  //   user.password = hashedPassword;

  await user.save();
  const userId = user._id;

  // Creating new account for the user
  await Account.create({ userId, balance: 1 + 10000 * Math.random() });
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User created Successfully!",
    token,
  });
});

//Signin route
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Invalid credentials",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });
  console.log(user);

  if (user) {
    // console.log(user.password);
    const isSame = await bcrypt.compare(req.body.password, user.password);
    if (isSame) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        JWT_SECRET
      );

      res.json({
        token: token,
      });
      return;
    } else {
      return res.status(403).json({
        message: "Incorrect Password",
      });
    }
  }

  return res.status(400).json({
    message: "User not found.",
  });
});

//Update user information route

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  console.log(req.body);
  const updateObject = {};
  if (req.body.firstName) updateObject.firstName = req.body.firstName;
  if (req.body.lastName) updateObject.lastName = req.body.lastName;
  if (req.body.password)
    updateObject.password = await bcrypt.hash(req.body.password, 10); // Hash password before saving

  const updated = await User.updateOne(
    { _id: req.userId },
    { $set: updateObject }
  );
  if (updated.matchedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(201).json({
    message: "Updated successfully",
  });
});

//Route to get users from the backend, filterable via firstName/lastName
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
