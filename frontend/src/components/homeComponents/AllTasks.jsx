import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";

import Tasks from "../common/Tasks";
import Loading from "../Loading";

function AllTasks() {
  const { key, setKey } = useContext(Interaction);
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(`https://efficiency-api.onrender.com/api/${token}`);
    const res = await req.json();
    console.log("fetched");
    return res;
  };
  const { isLoading, data } = useQuery(["fetchAll_Tasks", key], fetchTasks);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 px-5 py-2">
      {data.map((e, i) => {
        return (
          <div key={i * 10}>
            <Tasks e={e} />
          </div>
        );
      })}
    </div>
  );
}

export default AllTasks;
