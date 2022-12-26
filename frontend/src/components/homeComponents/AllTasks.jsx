import React from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";

import Tasks from "../common/Tasks";
import Loading from "../Loading";

function AllTasks() {
  const { key, setKey } = useContext(Interaction);
  const fetchAllTasks = async () => {
    console.log("fetch");
    const req = await fetch("/api", {
      credentials: "include",
    });
    const res = await req.json();
    return res;
  };
  const { isLoading, isError, data } = useQuery(
    ["getTasks", key],
    fetchAllTasks,
    {
      // refetchOnMount: true,
      isPreviousData: false,
      cacheTime: 0,
    }
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 px-5 py-2">
      {data.map((e, i) => {
        return (
          <div key={i * 10}>
            <Tasks e={e} />
          </div>
        );
      })}
    </div>
  );
}

export default AllTasks;
