export async function completeTask(_id, completed) {
  console.log(_id, completed, "phase0");
  const token = localStorage.getItem("token");
  const req = await fetch(
    `https://efficiency-api.onrender.com/api/update_task`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, completed: !completed, token }),
    }
  );
  console.log(_id, " end phase0");
  const res = await req.json();
  return res;
  // window.location.reload();
}
