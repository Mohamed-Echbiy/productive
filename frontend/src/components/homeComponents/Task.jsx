import { useContext, useState } from "react";
import { completeTask } from "../../fc/completeTask";
import { deleteTask } from "../../fc/deleteTask";
import { Interaction } from "../../context/interactionAuth";
import { EditPen, Trash } from "../../Icons";
import { whatFlag } from "../../fc/whatFlag";

export default function Task({ data, updateEditStatus }) {
  const { setKey, setNotification } = useContext(Interaction);
  const [updatedStatus, setUpdateStatus] = useState(data.completed);
  const [isDeleted, setIsDeleted] = useState(false);

  function lunchCompleteTask() {
    const _id = data._id;
    const completed = updatedStatus;
    completeTask(_id, completed);
    setKey((pre) => !pre);
    setUpdateStatus((pre) => !pre);
  }
  async function LunchDelete(e) {
    deleteTask(e);
    setIsDeleted(true);
    setNotification(true);
  }

  return (
    <div
      className={`task_container text-xs md:text-base py-5 px-4 mb-4 border border-solid flex items-center justify-between ${
        isDeleted && "hidden"
      }`}
    >
      <p
        className={`task_name capitalize cursor-pointer ${
          updatedStatus ? "line-through text-gray-500" : null
        }`}
        onClick={lunchCompleteTask}
        title={
          updatedStatus ? "click to set uncompleted" : "click to set completed"
        }
      >
        {data.task}
      </p>

      <div className="priority flex items-center relative capitalize">
        {whatFlag(data.priority)}
        <button
          className="cursor-pointer absolute delete"
          value={data._id}
          onClick={LunchDelete}
          title="delete"
        >
          <Trash />
        </button>
        <div
          className="edit_pen ml-5 cursor-pointer"
          onClick={() => updateEditStatus((pre) => !pre)}
        >
          <EditPen />
        </div>
      </div>
    </div>
  );
}
