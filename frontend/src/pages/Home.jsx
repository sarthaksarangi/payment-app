import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" bg-slate-300  h-screen flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <Heading label={"Payment App"} />
          <div className=" mt-3">
            <p>Please Signup/Signin to get started!</p>
          </div>
          <div className="flex justify-between items-center gap-16  mt-8">
            <Button label={"Signup"} onClick={() => navigate("/signup")} />
            <Button label={"Signin"} onClick={() => navigate("/signin")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
