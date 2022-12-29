import { PriorityFlag } from "../Icons";

export const whatFlag = (priority) => {
  let flag;
  if (priority === "high") {
    return (flag = (
      <>
        <PriorityFlag color={"text-red-500"} />
        <PriorityFlag color={"text-red-500"} />
        <PriorityFlag color={"text-red-500"} />
      </>
    ));
  }
  if (priority === "normal") {
    return (flag = (
      <>
        <PriorityFlag color={"text-orange-400"} />
        <PriorityFlag color={"text-orange-400"} />
      </>
    ));
  }
  return (flag = (
    <>
      <PriorityFlag color={"text-green-400"} />
    </>
  ));
};
