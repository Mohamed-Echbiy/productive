import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";
import Tasks from "../common/Tasks";
import Loading from "../Loading";

function PendingTasks() {
  const { key } = useContext(Interaction);
  const fetchPending = async () => {
    const req = await fetch("/api/pending");
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery(
    ["pendingTasks", key],
    fetchPending,
    {
      isPreviousData: false,
      cacheTime: 0,
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
