import React from "react";
import { useQuery } from "react-query";
import Tasks from "../common/Tasks";

function CompletedTasks() {
  const fetchPending = async () => {
    const req = await fetch("/api/completed");
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery("CompletedTasks", fetchPending);
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

export default CompletedTasks;
