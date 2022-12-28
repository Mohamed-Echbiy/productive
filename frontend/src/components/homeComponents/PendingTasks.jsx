import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";
import Tasks from "../common/Tasks";
import Loading from "../Loading";

function PendingTasks() {
  const { key } = useContext(Interaction);
  const fetchPending = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/pending/${token}`
    );
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery(
    ["pendingTasks", key],
    fetchPending,
    {
      isPrevious: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-10 px-5 py-2">
      {data.map((e, i) => (
        <div key={i * 278} className="">
          <Tasks e={e} />
        </div>
      ))}
    </div>
  );
}

export default PendingTasks;
