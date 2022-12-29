import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Tasks from "../common/Tasks";
import Loading from "../Loading";
import AllTasks from "./AllTasks";
import PendingTasks from "./PendingTasks";
import FilterByActions from "../common/FilterByActions";

function CompletedTasks() {
  const [active, setActive] = useState("completed");

  const fetchPending = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/completed/${token}`,
      {}
    );
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery(
    ["CompletedTasks"],
    fetchPending,
    {
      refetchOnMount: true,
    }
  );
  if (active === "pending") {
    return <PendingTasks />;
  }
  if (active === "all") {
    return <AllTasks />;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FilterByActions active={active} setActive={setActive} />
      <div className="mt-10 px-5 py-2">
        {data.map((e, i) => (
          <div key={i * 278} className="">
            <Tasks e={e} />
          </div>
        ))}
      </div>
    </>
  );
}

export default CompletedTasks;
