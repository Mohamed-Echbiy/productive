export async function completeTask(_id, completed) {
  //   console.log(_id, completed);
  const req = await fetch("/api/update_task", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, completed: !completed }),
  });
  const res = await req.json();
  console.log(res);
  // window.location.reload();
}
