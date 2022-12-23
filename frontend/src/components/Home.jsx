import React, { useContext } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Cookies from "js-cookie";
import AddTask from "./homeComponents/AddTask";
import AllTasks from "./homeComponents/AllTasks";

function Home() {
  const { userAuth, setUserAuth } = useContext(AuthContext);

  useEffect(() => {
    const user = Cookies.get("ACCESS-TOKEN");
    if (user) {
      setUserAuth(true);
    }
  }, []);
  const fetchAllTasks = async () => {
    const req = await fetch("/api", {
      credentials: "include",
    });
    const res = await req.json();
    return res;
  };
  const { isLoading, error, data } = useQuery("getTasks", fetchAllTasks);
  if (isLoading) {
    return <p>isLoading</p>;
  }

  if (!userAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <>
        <AddTask />
        <AllTasks data={data} />
      </>
    </div>
  );
}

export default Home;
