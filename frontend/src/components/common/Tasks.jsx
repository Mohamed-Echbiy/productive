import React from "react";
import { deleteTask } from "../../fc/deleteTask";
import { PriorityFlag, Trash } from "../../Icons";

function Tasks({ e }) {
  let flag;
  if (e.priority === "high") {
    flag = (
      <>
        <PriorityFlag color={"text-red-500"} />
        <PriorityFlag color={"text-red-500"} />
        <PriorityFlag color={"text-red-500"} />
      </>
    );
  } else if (e.priority === "normal") {
    flag = (
      <>
        <PriorityFlag color={"text-orange-400"} />
        <PriorityFlag color={"text-orange-400"} />
      </>
    );
  } else {
    flag = (
      <>
        <PriorityFlag color={"text-green-400"} />
      </>
    );
  }
  return (
    <div className="task_container py-2 px-4 mb-4 border border-solid flex items-center justify-between">
      <p className="tas_name capitalize">{e.task}</p>
      <div className="priority flex items-center">
        {flag}
        <button
          className="delete cursor-pointer ml-5"
          value={e._id}
          onClick={deleteTask}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default Tasks;
