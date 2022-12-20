import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dataInfo, setData] = useState("");

  async function login_In(e) {
    e.preventDefault();
    setError("");
    setData("");
    const request = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await request.json();
    if (!response.ok) {
      return setError(response.msg);
    } else {
      console.log(response);
    }
  }
  console.log(error, dataInfo);
  return (
    <div className="login-form">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-black border border-solid mr-5"
      />
      <input
        type="password"
        name="password"
        value={password}
        className="border-black border border-solid mr-5"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={login_In}>
        Login
      </button>
    </div>
  );
}

export default Login;
