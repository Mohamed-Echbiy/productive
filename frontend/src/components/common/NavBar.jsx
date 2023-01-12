import { Button, Stack } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { logout } from "../../fc/logout";
import { Login, Logout, SignUp, Setting } from "../../Icons";

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
            <Link to={"/login"}>
              <Button
                endIcon={<Login />}
                variant="contained"
                color="success"
                disableElevation
              >
                <span>login</span>
              </Button>
            </Link>
          ) : (
            <Stack direction={"row"} spacing={2}>
              <Button
                color="error"
                variant="outlined"
                endIcon={<Logout />}
                onClick={logout}
              >
                LogOut
              </Button>
              {/* <div className="setting_icon flex items-center">
                <Setting />
              </div> */}
            </Stack>
          )}
        </div>
        {!userAuth && (
          <div className="signUp ">
            <Link to={"/sign-up"}>
              <Button
                endIcon={<SignUp />}
                variant="contained"
                color="warning"
                disableElevation
              >
                <span>SignUp</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
