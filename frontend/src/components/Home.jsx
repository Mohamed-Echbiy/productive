import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";
import Navigation from "./common/Navigation";

function Home() {
  const { userAuth, setUserAuth } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("todayDate")) {
      const date = new Date("2022/01/01").toISOString();
      const indexOfT = date.indexOf("T");
      localStorage.setItem("todayDate", date.slice(0, indexOfT));
    }
    // if (!localStorage.getItem("workedTime")) {
    //   localStorage.setItem("workedTime", 0);
    // }
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
