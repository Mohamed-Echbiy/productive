export async function editedNote(e, update) {
  const _id = e.currentTarget.value;
  const token = localStorage.getItem("token");
  const req = await fetch(
    `https://efficiency-api.onrender.com/api/update_note`,
    {
      method: "PATCH",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, ...update, token }),
    }
  );
  // console.log(_id, update);
  const res = await req.json();
  // console.log(res);
  // window.location.reload();
}
