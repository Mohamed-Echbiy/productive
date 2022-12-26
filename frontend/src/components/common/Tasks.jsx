import React, { useState } from "react";
import { useContext } from "react";
import { Interaction } from "../../context/interactionAuth";
import { completeTask } from "../../fc/completeTask";
import { deleteTask } from "../../fc/deleteTask";
import { EditTask } from "../../fc/editTask";
import {
  CloseAddTaskWindow,
  EditPen,
  PriorityFlag,
  Trash,
  Update,
} from "../../Icons";

function Tasks({ e }) {
  const { setKey, setNotification } = useContext(Interaction);
  const [editStatus, setEditStatus] = useState(false);
  const [updatedTask, setUpdateTask] = useState(e.task);
  const [updatedPriority, setUpdatePriority] = useState(e.priority);
  const [updatedStatus, setUpdateStatus] = useState(e.completed);
  const [isDeleted, setIsDeleted] = useState(false);

  // console.log(updatedTask, updatedPriority);
  function lunchEditTask(e) {
    const update = { task: updatedTask, priority: updatedPriority };
    EditTask(e, update);
    setKey((pre) => !pre);
  }
  function lunchCompleteTask() {
    const _id = e._id;
    setUpdateStatus((pre) => !pre);
    const completed = updatedStatus;
    completeTask(_id, completed);
    setKey((pre) => !pre);
  }
  async function LunchDelete(e) {
    deleteTask(e);
    setIsDeleted(true);
    setNotification(true);
  }
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
    <div
      className={`task_container text-xs md:text-base py-5 px-4 mb-4 border border-solid flex items-center justify-between ${
        isDeleted && "hidden"
      }`}
    >
      {editStatus ? (
        <input
          type="text"
          placeholder={e.task}
          onChange={(e) => setUpdateTask(e.target.value)}
          className="p-2 px-1 outline-none border border-solid border-blue-500"
          autoFocus
        />
      ) : (
        <p
          className={`task_name capitalize cursor-pointer ${
            updatedStatus && "line-through text-gray-500"
          }`}
          onClick={lunchCompleteTask}
          title={
            updatedStatus
              ? "click to set uncompleted"
              : "click to set completed"
          }
        >
          {e.task}
        </p>
      )}
      <div className="priority flex items-center relative capitalize">
        {editStatus ? (
          <select
            className="px-2 py-2 border border-solid border-blue-500 bg-white rounded"
            onChange={(e) => setUpdatePriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="normal">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          flag
        )}
        <button
          className="cursor-pointer absolute delete"
          value={e._id}
          onClick={LunchDelete}
          title="delete"
        >
          <Trash />
        </button>
        <div
          className="edit_pen ml-5 cursor-pointer"
          onClick={() => setEditStatus((pre) => !pre)}
        >
          {editStatus ? (
            <div className="flex">
              <CloseAddTaskWindow />
              <button
                className="ml-2 cursor-pointer"
                value={e._id}
                onClick={lunchEditTask}
                title="update"
              >
                <Update />
              </button>
            </div>
          ) : (
            <EditPen />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
