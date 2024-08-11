import { useEffect } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuthenticated, setUser } = useAuth();

  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated == "true") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="sarthak"
            label={"Username"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="xyz@12345"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username: username,
                    password: password,
                  }
                );
                if (response) {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("isAuthenticated", true);
                  setIsAuthenticated(true);
                  setUser({
                    username: username,
                    token: response.data.token,
                  });
                  navigate("/dashboard");
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
