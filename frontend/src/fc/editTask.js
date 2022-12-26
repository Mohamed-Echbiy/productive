export async function EditTask(e, update) {
  const _id = e.currentTarget.value;
  const req = await fetch("/api/update_task", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, ...update }),
  });
  // console.log(_id, update);
  const res = await req.json();
  // console.log(res);
  // window.location.reload();
}
