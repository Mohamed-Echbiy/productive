import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";
import FilterByActions from "../common/FilterByActions";
import FilterByPriority from "../common/FilterByPriority";
import SortByDate from "../common/SortByDate";
import Tasks from "../common/Tasks";
import Loading from "../Loading";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";

function PendingTasks() {
  const [variant, setVariant] = useState(localStorage.getItem("priority"));
  const [sortByDate, setDateSortMethod] = useState(
    localStorage.getItem("sortByDate")
  );
  const [active, setActive] = useState("pending");

  const { key } = useContext(Interaction);
  useEffect(() => {
    localStorage.setItem("sortByDate", sortByDate);
    localStorage.setItem("priority", variant);
  }, [sortByDate, variant]);
  const fetchPending = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/pending/${token}?createdAt=${sortByDate}&completed=${1}`
    );
    const res = await req.json();
    return res;
  };
  const { isLoading, data, isError } = useQuery(
    ["pendingTasks", key, sortByDate, variant],
    fetchPending,
    {
      refetchOnMount: true,
    }
  );
  if (active === "completed") {
    return <CompletedTasks />;
  }
  if (active === "all") {
    return <AllTasks />;
  }
  if (isLoading) {
    return <Loading />;
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
            <div key={i * 200}>
              <Tasks e={e} />
            </div>
          ))
        : data
            .filter((e) => e.priority === variant)
            .map((e, i) => (
              <div key={i * 1100}>
                <Tasks e={e} />
              </div>
            ))}
    </div>
  );
}

export default PendingTasks;
