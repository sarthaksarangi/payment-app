import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useAuth } from "../authProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [balance, setBalance] = useState(0);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
      })
      .catch((err) => console.log(err));
  }, [firstName]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBalance(Math.floor(res.data.balance));
      })
      .catch((err) => console.log(err));
  }, [balance]);

  return (
    <div>
      {isAuthenticated === "false" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col justify-evenly items-center gap-4">
            <p className=" font-semibold  text-2xl">Please Signin again!</p>
            <Button label={"Signin"} onClick={() => navigate("/signin")} />
          </div>
        </div>
      ) : (
        <div>
          <Appbar firstName={firstName} />
          <div className="m-8">
            <Balance value={balance} />
            <Users />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
