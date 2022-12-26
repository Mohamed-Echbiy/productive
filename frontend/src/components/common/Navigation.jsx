import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AllTasks from "../homeComponents/AllTasks";
import CompletedTasks from "../homeComponents/CompletedTasks";
import PendingTasks from "../homeComponents/PendingTasks";
import {
  AddTaskIcon,
  CloseAddTaskWindow,
  Done,
  Inbox,
  Pending,
} from "../../Icons";
import AddTask from "../homeComponents/AddTask";
import { Interaction } from "../../context/interactionAuth";
import { RandomAvatar } from "../../fc/randomAvatar";

function Navigation() {
  const [active, setActive] = useState(3);
  const [avatar, setAvatar] = useState("");
  const { addTaskWindow, setAddTaskWindow } = useContext(Interaction);
  useEffect(() => {
    setAvatar(RandomAvatar());
  }, []);
  return (
    <div className="relative navigation_container pt-16">
      <ul className="flex items-center justify-center">
        <li className=" w-12 mr-2">
          <img src={avatar} alt="I am watching you" />
        </li>
        <li
          onClick={() => setActive(1)}
          className={`mr-5 py-2 px-2 md:px-4 cursor-pointer md:border-2 ${
            active === 1 &&
            "border-solid border-blue-500 text-blue-700 md:text-black"
          }`}
        >
          <button className="inbox_icon md:hidden" title="All Tasks">
            <Inbox />
          </button>
          <p className={` hidden md:block `}>All</p>
        </li>
        <li
          onClick={() => setActive(2)}
          className={`mr-5 py-2 px-2 md:px-4 cursor-pointer md:border-2 ${
            active === 2 &&
            "border-solid border-blue-500 text-blue-700 md:text-black"
          }`}
        >
          <p className="hidden md:block">completed</p>
          <button className="done_icon md:hidden" title="Completed Tasks">
            <Done />
          </button>
        </li>
        <li
          onClick={() => setActive(3)}
          className={`mr-5 py-2 px-2 md:px-4 cursor-pointer md:border-2 ${
            active === 3 &&
            "border-solid border-blue-500 text-blue-700 md:text-black"
          }`}
        >
          <p className="hidden md:block">Pending</p>
          <button className="pending_icon md:hidden" title="Pending Tasks">
            <Pending />
          </button>
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
