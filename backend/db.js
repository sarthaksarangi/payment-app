const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//Method to hash user's password
// userSchema.methods.createHash = async (plainTextPassword) => {
//   //Hashing users password with the no. of defined interations
//   const saltRounds = 10;
//   const salt = await bcrypt.salt(saltRounds);
//   return await bcrypt.hash(plainTextPassword, salt);
// };
// //Method to validate the user's passwords
// userSchema.methods.validPassword = async (candidatePassword) => {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}`
  );
  console.log("Database is connected");
}
module.exports = {
  User,
  Account,
};
