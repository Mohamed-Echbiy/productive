import { useContext, useState } from "react";
import { completeTask } from "../../fc/completeTask";
import { deleteTask } from "../../fc/deleteTask";
import { Interaction } from "../../context/interactionAuth";
import { EditPen, IsDone, IsNotDone, Trash } from "../../Icons";
import { whatFlag } from "../../fc/whatFlag";
import { Button } from "@mui/material";
import useSound from "use-sound";
import completed from "../../sounds/complete.ogg";
import deleteSoundEffect from "../../sounds/whoosh-6316.mp3";

export default function Task({ data, updateEditStatus }) {
  const [Play] = useSound(completed);
  const [deleteSound] = useSound(deleteSoundEffect);
  const { key, setKey, setNotification } = useContext(Interaction);
  // const [updatedStatus, setUpdateStatus] = useState(data.completed);
  const [isDeleted, setIsDeleted] = useState(false);
  async function lunchCompleteTask() {
    const _id = await data._id;
    const completed = await data.completed;
    await completeTask(_id, completed);
    await setKey((pre) => !pre);
    !completed && Play();
    setNotification(true);
  }
  async function LunchDelete(e) {
    deleteTask(e);
    setIsDeleted(true);
    deleteSound();
    setNotification(true);
  }

  return (
    <div
      className={`task_container rounded text-xs md:text-base py-5 px-4 mb-4 border-2 border-solid  flex items-center justify-between ${
        isDeleted && "hidden"
      } ${data.completed ? "border-green-600" : "border-gray-400"}`}
    >
      <Button
        startIcon={data.completed ? <IsDone /> : <IsNotDone />}
        onClick={lunchCompleteTask}
      >
        <p className={`${data.completed ? "line-through" : null} text-black`}>
          {data.task}
        </p>
      </Button>

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
