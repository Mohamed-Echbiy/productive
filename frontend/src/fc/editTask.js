export async function EditTask(e, updatedTask) {
  const _id = e.target.value;
  const req = await fetch("/api/update_task", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, task: updatedTask }),
  });
  const res = await req.json();
  console.log(res);
}
