export const noteDelete = async (e) => {
  const _id = e.currentTarget.value;
  const req = await fetch(
    `https://efficiency-api.onrender.com/api/delete_note`,
    {
      method: "DELETE",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    }
  );
  const res = await req.json();
  console.log("deleted");
};
