import { useState, useContext } from "react";
import { Interaction } from "../../context/interactionAuth";
import { Button, MenuItem, Select } from "@mui/material";
import SelectPriority from "../common/SelectPriority";
import InputField from "../common/InputField";

function AddTask() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const { setAddTaskWindow, setKey, setNotification } = useContext(Interaction);
  console.log(task, priority);
  async function AddTask(e) {
    const token = localStorage.getItem("token");
    if (!task) {
      return setError("please write your task name");
    }
    e.preventDefault();
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/add_task`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, priority, token }),
      }
    );
    const res = await req.json();
    setKey((pre) => !pre);
    setAddTaskWindow(false);
    setTimeout(() => {
      setNotification(true);
    }, 500);
  }
  return (
    <div className="addTask_form capitalize  ">
      <div className="addTask_task flex flex-col mb-5">
        <InputField updateState={setTask} state={error} />
      </div>
      <div className="addTask_priority mb-5">
        <SelectPriority updateState={setPriority} />
      </div>
      <Button
        type="submit"
        variant="contained"
        disableElevation
        onClick={AddTask}
      >
        Add task
      </Button>
    </div>
  );
}

export default AddTask;
