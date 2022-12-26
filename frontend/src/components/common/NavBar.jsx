import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { logout } from "../../fc/logout";
import { Login, Logout, SignUp } from "../../Icons";

function Navbar() {
  const { userAuth, setUserAuth } = useContext(AuthContext);
  function lunchLogout() {
    setUserAuth(false);
    logout();
  }
  return (
    <div className="Navbar w-full pt-5  flex items-center justify-between">
      <div className="logo py-4 flex items-center font-semibold text-violet-600 text-lg">
        Efficiency
        <img
          src="./pickaxe.png"
          alt="pickaxe from Minecraft with efficiency enchantment"
          className="w-7 ml-2"
        />
      </div>
      <div className="links-register py-4 flex items-center justify-between">
        <div className="login mr-3">
          {!userAuth ? (
            <Link
              to={"/login"}
              className=" sm:border-2 border-solid border-black md:px-4 md:py-2 rounded-md text-xs md:text-sm flex items-centers"
            >
              <span className="mr-2">login</span>
              <Login />
            </Link>
          ) : (
            <button
              className="border-2 border-solid border-black px-4 py-2 rounded-md text-xs md:text-sm flex items-center"
              onClick={logout}
            >
              <span className="mr-2">Logout</span>
              <Logout />
            </button>
          )}
        </div>
        {!userAuth && (
          <div className="signUp ">
            <Link
              to={"/sign-up"}
              className=" md:border-2 border-solid border-black md:px-4 md:py-2 rounded-md text-xs md:text-sm flex items-center"
            >
              <span className="mr-2">sign-up</span>
              <SignUp />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
