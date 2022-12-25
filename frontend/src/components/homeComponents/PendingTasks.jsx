import React from "react";
import { useQuery } from "react-query";
import Tasks from "../common/Tasks";

function PendingTasks() {
  const fetchPending = async () => {
    const req = await fetch("/api/pending");
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery("pendingTasks", fetchPending);

  if (isLoading) {
    return <h1>isLoading</h1>;
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
