import React from "react";

const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance is</div>
      <div className="font-semibold ml-2 text-lg">Rs {value}</div>
    </div>
  );
};

export default Balance;
