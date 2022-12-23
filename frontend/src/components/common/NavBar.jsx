import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { userAuth } = useContext(AuthContext);
  return (
    <div className="Navbar w-full pt-5 flex items-center justify-between">
      <div className="logo py-4 text-red-700 text-lg">Productive</div>
      <div className="links-register py-4 flex items-center justify-between">
        <div className="login mr-3">
          {!userAuth ? (
            <Link to={"/login"}>login</Link>
          ) : (
            <button className="">Logout</button>
          )}
        </div>
        {!userAuth && (
          <div className="signUp ">
            <Link to={"/sign-up"}>sign-up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
