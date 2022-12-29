import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";
import Navigation from "./common/Navigation";

function Home() {
  const { userAuth, setUserAuth } = useContext(AuthContext);
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setUserAuth(true);
    }
  }, []);

  if (!userAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <>
        <Navigation />
      </>
    </div>
  );
}

export default Home;
