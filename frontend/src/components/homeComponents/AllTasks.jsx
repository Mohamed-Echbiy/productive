import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
// fc : is a folder containing all functions logic to make the code more readable
import { deleteTask } from "../../fc/deleteTask";
import { EditTask } from "../../fc/editTask";

import Tasks from "../common/Tasks";

function AllTasks() {
  const [updatedTask, UpdateTask] = useState("");
  const fetchAllTasks = async () => {
    const req = await fetch("/api", {
      credentials: "include",
    });
    const res = await req.json();
    return res;
  };
  const { isLoading, isError, data } = useQuery("getTasks", fetchAllTasks);
  if (isLoading) {
    return <p>isLoading</p>;
  }

  function lunchEditTask(e) {
    EditTask(e, updatedTask);
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
