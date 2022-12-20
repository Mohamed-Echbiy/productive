import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar w-full mt-5 mb-8 flex items-center justify-between">
      <div className="logo py-4 text-red-700 text-lg">Productive</div>
      <div className="links-register py-4 flex items-center justify-between">
        <div className="login mr-3">
          <Link to={"/login"}>login</Link>
        </div>
        <div className="signUp ">
          <Link to={"/sign-up"}>sign-up</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
