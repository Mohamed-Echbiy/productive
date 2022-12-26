import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Interaction } from "../../context/interactionAuth";

function AddTask() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const { setAddTaskWindow, setKey, setNotification } = useContext(Interaction);
  // console.log(task, priority);
  async function AddTask(e) {
    if (!task) {
      return setError("please write your task name");
    }
    e.preventDefault();
    const req = await fetch("/api/add_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, priority }),
    });
    const res = await req.json();
    setKey((pre) => !pre);
    setAddTaskWindow(false);
    setNotification(true);
  }
  return (
    <div className="addTask_form capitalize  ">
      <div className="addTask_task flex flex-col mb-5">
        {error && (
          <p className="text-center text-red-500 px-2 py-1 mb-3">{error}</p>
        )}
        <label htmlFor="task" className="mb-2 drop-shadow-md">
          task
        </label>
        <input
          type="text"
          id="task"
          className="border border-solid border-blue-500 block rounded-md outline-none py-1 px-2 drop-shadow-xl"
          onChange={(e) => setTask(e.target.value)}
          autoFocus={true}
        />
      </div>
      <div className="addTask_priority mb-5">
        <label htmlFor="priority " className="mr-2">
          priority:{" "}
        </label>
        <select
          name="priority"
          id="priority"
          className="py-2 px-1 text-center capitalize rounded-sm bg-white border border-solid border-blue-500"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-md mt-5 border border-solid border-blue-500"
        onClick={AddTask}
      >
        Add task
      </button>
    </div>
  );
}

export default AddTask;
