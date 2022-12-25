import React from "react";
import { useState } from "react";
import AllTasks from "../homeComponents/AllTasks";
import CompletedTasks from "../homeComponents/CompletedTasks";
import PendingTasks from "../homeComponents/PendingTasks";
import { AddTaskIcon, CloseAddTaskWindow } from "../../Icons";
import AddTask from "../homeComponents/AddTask";

function Navigation() {
  const [active, setActive] = useState(1);
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  return (
    <div className="relative navigation_container">
      <ul className="flex items-center justify-center">
        <li
          onClick={() => setActive(1)}
          className={`mr-5 py-2 px-4 cursor-pointer border-2 ${
            active === 1 && "border-solid border-blue-500"
          }`}
        >
          All
        </li>
        <li
          onClick={() => setActive(2)}
          className={`mr-5 py-2 px-4 cursor-pointer border-2 ${
            active === 2 && "border-solid border-blue-500"
          }`}
        >
          Completed
        </li>
        <li
          onClick={() => setActive(3)}
          className={`mr-5 py-2 px-4 cursor-pointer border-2 ${
            active === 3 && "border-solid border-blue-500"
          }`}
        >
          Pending
        </li>
        <li className=" cursor-pointer z-50" title="add task">
          <div
            className="addTask_icon z-50 cursor-pointer"
            onClick={() => setAddTaskWindow((pre) => !pre)}
          >
            {addTaskWindow ? <CloseAddTaskWindow /> : <AddTaskIcon />}
          </div>
        </li>
      </ul>
      <div className={`content_container ${addTaskWindow && "blur-md"}`}>
        {(active === 1 && <AllTasks />) ||
          (active === 3 && <PendingTasks />) ||
          (active === 2 && <CompletedTasks />)}
      </div>
      {addTaskWindow && (
        <div className="absolute addTaskWindow flex justify-center items-center z-40 top-0 left-0 w-full -right-1/2 -bottom-1/2  px-3 py-3">
          <AddTask />
        </div>
      )}
    </div>
  );
}

export default Navigation;
