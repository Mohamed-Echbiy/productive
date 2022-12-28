export async function completeTask(_id, completed) {
  //   console.log(_id, completed);
  const token = localStorage.getItem("token");
  const req = await fetch(
    "https://efficiency-api.onrender.com/api/update_task",
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, completed: !completed, token }),
    }
  );
  const res = await req.json();
  console.log(res);
  // window.location.reload();
}
