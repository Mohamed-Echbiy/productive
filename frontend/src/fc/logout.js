export const logout = async () => {
  const req = await fetch("/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();
  //   console.log(res);
  window.location.reload();
};
