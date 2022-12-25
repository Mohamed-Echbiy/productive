export async function deleteTask(e) {
  const _id = e.currentTarget.value;
  const req = await fetch("/api/delete_task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
  const res = await req.json();
  window.location.reload();
}
