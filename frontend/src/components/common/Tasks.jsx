import React, { useState } from "react";
import Edited from "../homeComponents/Edited";
import Task from "../homeComponents/Task";

function Tasks({ e }) {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <>
      {editStatus ? (
        <Edited data={e} updateEditStatus={setEditStatus} />
      ) : (
        <Task data={e} updateEditStatus={setEditStatus} />
      )}
    </>
  );
}

export default Tasks;
