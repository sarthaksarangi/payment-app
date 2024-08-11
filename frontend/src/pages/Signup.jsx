import { useEffect } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import { useAuth } from "../authProvider";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuthenticated, user, setUser } = useAuth();
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated == "true") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" bg-slate-300  h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <Subheading label={"Enter your informaton to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label={"Username"}
            placeholder={"john"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"xyz@12345"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                if (response) {
                  localStorage.setItem("token", response.data.token);
                  setIsAuthenticated(true);
                  setUser({
                    username: username,
                    token: response.data.token,
                  });
                  navigate("/dashboard");
                }
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
