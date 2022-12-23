import React from "react";
import { useState } from "react";

function AllTasks({ data }) {
  const [updatedTask, UpdateTask] = useState("");
  console.log(data);
  async function deleteTask(e) {
    const _id = e.target.value;
    const req = await fetch("/api/delete_task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const res = await req.json();
    console.log(res);
  }
  async function EditTask(e) {
    const _id = e.target.value;
    const req = await fetch("/api/update_task", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, task: updatedTask }),
    });
    const res = await req.json();
    console.log(res);
  }
  return (
    <div className="mt-10 px-5 py-2 border border-solid border-black">
      {data.map((e, i) => (
        <div key={i * 10}>
          <p>{e.task}</p>
          <p>{e.priority}</p>
          <button className="py-2 px-3" value={e._id} onClick={deleteTask}>
            delete
          </button>
          <input
            type="text"
            name="taskUpdate"
            onChange={(e) => UpdateTask(e.target.value)}
          />
          <button className="py-2 px-3" value={e._id} onClick={EditTask}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default AllTasks;
