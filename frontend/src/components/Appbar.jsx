import Logout from "./Logout";
import { Link } from "react-router-dom";

const Appbar = ({ firstName }) => {
  return (
    <div className="shadow h-14 flex justify-between font-bold">
      <div className="flex flex-col justify-center h-full ml-4 text-xl">
        <Link to="/">Payment App</Link>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center h-full mr-4 gap-2  ">
          Hello, {firstName}
          <div className=" mt-2">
            <Logout />
          </div>
        </div>

        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-lg">
            {firstName[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
