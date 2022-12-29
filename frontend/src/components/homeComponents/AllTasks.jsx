import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";
import FilterByActions from "../common/FilterByActions";

import FilterByPriority from "../common/FilterByPriority";
import SortByDate from "../common/SortByDate";

import Tasks from "../common/Tasks";
import Loading from "../Loading";
import CompletedTasks from "./CompletedTasks";
import PendingTasks from "./PendingTasks";

function AllTasks() {
  const { key, setKey } = useContext(Interaction);
  const [variant, setVariant] = useState(localStorage.getItem("priority"));
  const [sortByDate, setDateSortMethod] = useState(
    localStorage.getItem("sortByDate")
  );
  const [active, setActive] = useState("all");

  useEffect(() => {
    localStorage.setItem("sortByDate", sortByDate);
    localStorage.setItem("priority", variant);
  }, [sortByDate, variant]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/all/${token}?createdAt=${sortByDate}&completed=${1}`
    );
    const res = await req.json();
    return res;
  };
  const { isLoading, data } = useQuery(
    ["fetchAll_Tasks", key, sortByDate],
    fetchTasks,
    {
      refetchOnMount: true,
    }
  );
  if (isLoading) {
    return <Loading />;
  }

  if (active === "pending") {
    return <PendingTasks />;
  }
  if (active === "completed") {
    return <CompletedTasks />;
  }
  return (
    <div className="py-2 px-4">
      <Stack direction={"row"} spacing={2}>
        <FilterByActions active={active} setActive={setActive} />
        <FilterByPriority updateVariant={setVariant} variant={variant} />
        <SortByDate
          setDateSortMethod={setDateSortMethod}
          sortDate={sortByDate}
        />
      </Stack>
      {variant === "all"
        ? data.map((e, i) => (
            <div key={i * 2}>
              <Tasks e={e} />
            </div>
          ))
        : data
            .filter((e) => e.priority === variant)
            .map((e, i) => (
              <div key={i * 5500}>
                <Tasks e={e} />
              </div>
            ))}
    </div>
  );
}

export default AllTasks;
