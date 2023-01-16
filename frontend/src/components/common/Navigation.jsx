import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AllTasks from "../homeComponents/AllTasks";
import CompletedTasks from "../homeComponents/CompletedTasks";
import PendingTasks from "../homeComponents/PendingTasks";
import {
  AddTaskIcon,
  CheckList,
  CloseAddTaskWindow,
  Done,
  Inbox,
  NotesIcon,
  Pending,
} from "../../Icons";
import AddTask from "../homeComponents/AddTask";
import { Interaction } from "../../context/interactionAuth";
import { RandomAvatar } from "../../fc/randomAvatar";
import { Button, Stack } from "@mui/material";
import Notes from "../NotesComponents/Notes";
import Clock from "../ClockComponents/Clock";

function Navigation() {
  const [active, setActive] = useState(+localStorage.getItem("tab"));
  const [avatar, setAvatar] = useState("");

  const { addTaskWindow, setAddTaskWindow } = useContext(Interaction);

  useEffect(() => {
    if (!localStorage.getItem("tab")) {
      localStorage.setItem("tab", 1);
    } else {
      localStorage.setItem("tab", active);
    }
    setAvatar(RandomAvatar());
  }, [active]);
  return (
    <div className="relative navigation_container pt-16 ">
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent={{ xs: "space-between", sm: "center" }}
        className="mb-16"
      >
        {+localStorage.getItem("darkMod") ? (
          <Stack>
            <img src={avatar} alt="I am you" className="w-12" />
          </Stack>
        ) : (
          <></>
        )}
        <Button
          color="primary"
          variant={active === 0 ? "contained" : "outlined"}
          endIcon={<CheckList />}
          onClick={() => setActive(0)}
          size="medium"
        >
          Tasks
        </Button>
        <Button
          color="secondary"
          endIcon={<NotesIcon />}
          variant={active === 2 ? "contained" : "outlined"}
          size="medium"
          onClick={() => setActive(2)}
        >
          Notes
        </Button>
        <Button
          color="warning"
          endIcon={<Pending />}
          variant={active === 3 ? "contained" : "outlined"}
          size="medium"
          onClick={() => setActive(3)}
        >
          Clock
        </Button>
        <li
          className={`cursor-pointer z-50 ${
            active === 3 || (active === 2 && "hidden")
          }`}
          title="add task"
        >
          <div
            className="addTask_icon z-50 cursor-pointer"
            onClick={() => setAddTaskWindow((pre) => !pre)}
          >
            {addTaskWindow ? <CloseAddTaskWindow /> : <AddTaskIcon />}
          </div>
        </li>
      </Stack>
      <div className={`content_container ${addTaskWindow && "blur-md"}`}>
        {(+active === 0 && <AllTasks />) ||
          (+active === 2 && <Notes />) ||
          (+active === 3 && <Clock />)}
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
