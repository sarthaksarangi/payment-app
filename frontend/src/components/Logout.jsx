import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../authProvider";

const Logout = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        label={"Signout"}
        onClick={() => {
          localStorage.setItem("token", "");
          localStorage.setItem("isAuthenticated", false);
          setIsAuthenticated(false);
          console.log("navigate");
          navigate("/signin");
        }}
      />
    </div>
  );
};

export default Logout;
