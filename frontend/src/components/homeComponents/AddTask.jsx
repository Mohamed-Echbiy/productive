import React from "react";
import { useState } from "react";

function AddTask() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  // console.log(task, priority);
  async function AddTask(e) {
    e.preventDefault();
    const req = await fetch("/api/add_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, priority }),
    });
    const res = await req.json();
    window.location.reload();
  }
  return (
    <div className="addTask_form capitalize">
      <div className="addTask_task flex flex-col mb-5">
        <label htmlFor="task">task</label>
        <input
          type="text"
          id="task"
          className="border border-solid border-black"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="addTask_priority mb-5">
        <label htmlFor="priority" className="mr-2">
          priority:{" "}
        </label>
        <select
          name="priority"
          id="priority"
          className="py-2 px-1 text-center capitalize"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-2 py-1 border border-solid border-lime-500"
        onClick={AddTask}
      >
        Add task
      </button>
    </div>
  );
}

export default AddTask;
