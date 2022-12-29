import { useContext, useState } from "react";

import { Interaction } from "../../context/interactionAuth";

import { EditTask } from "../../fc/editTask";

import { CloseAddTaskWindow, Update } from "../../Icons";

import InputField from "../common/InputField";
import SelectPriority from "../common/SelectPriority";

export default function Edited({ data, updateEditStatus }) {
  const { setKey } = useContext(Interaction);

  const [updatedTask, setUpdateTask] = useState("");
  const [updatedPriority, setPriority] = useState(data.priority);
  const [error, setError] = useState("");

  function lunchEditTask(e) {
    if (!updatedTask) {
      return setError(true);
    }
    const update = { task: updatedTask, priority: updatedPriority };
    EditTask(e, update);
    setKey((pre) => !pre);
  }

  return (
    <div className="task_container text-xs md:text-base py-5 px-4 mb-4 border border-solid flex items-center justify-between ">
      <InputField state={error} updateState={setUpdateTask} />

      <div className="priority flex items-center relative capitalize">
        <SelectPriority updateState={setPriority} />
        <div
          className="edit_pen ml-5 cursor-pointer"
          onClick={() => updateEditStatus((pre) => !pre)}
        >
          <div className="flex">
            <CloseAddTaskWindow />
            <button
              className="ml-2 cursor-pointer"
              value={data._id}
              onClick={lunchEditTask}
              title="update"
            >
              <Update />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
