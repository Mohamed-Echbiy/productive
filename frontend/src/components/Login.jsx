import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Email, Password } from "../Icons";
import image from "../undraw_projections_re_ulc6.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserAuth, userAuth } = useContext(AuthContext);

  async function login_In(e) {
    e.preventDefault();
    setError("");
    const request = await fetch(
      "https://efficiency-api.onrender.com/api/user/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const response = await request.json();
    console.log(response.msg);
    if (!response.msg === true) {
      return setError(response.msg);
    }
    if (response.msg === true) {
      localStorage.setItem("token", response.token);
      setUserAuth(true);
    }
  }
  if (userAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className=" hero-container flex flex-row-reverse justify-around items-center">
      <div className="login-form flex justify-center flex-col max-w-sm px-2 m-auto lg:m-0">
        <h2 className=" text-3xl md:text-4xl mb-10 text-violet-600">LOGIN</h2>
        {error && (
          <div className="error mb-7 text-center p-2 italic text-rose-600 text-sm md:text-base">
            <p>{error}</p>
          </div>
        )}
        <label
          htmlFor="email"
          className="mb-4 text-center text-sm md:text-base cursor-pointer"
        >
          Email
        </label>
        <div className="inputField relative">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="demo@demo.com"
            onChange={(e) => setEmail(e.target.value)}
            className=" rounded-md border-black border border-solid mb-7 py-2 md:py-1 pl-9 w-full text-sm md:text-base"
          />
          <div className="icon absolute w-fit ">
            <Email />
          </div>
        </div>
        <label
          htmlFor="password"
          className="mb-4 text-center text-sm md:text-base cursor-pointer"
        >
          Password
        </label>
        <div className="inputField relative">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            placeholder="demo"
            className="rounded-md border-black border border-solid mb-7 py-2 md:py-1 pl-9 w-full text-xs md:text-base"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="icon absolute w-fit">
            <Password />
          </div>
        </div>
        <button
          type="submit"
          className="px-5 py-2 w-fit text-sm md:text-base m-auto rounded border border-solid border-blue-500"
          onClick={login_In}
        >
          Login
        </button>
      </div>
      <div className="image w-2/5 hidden lg:block">
        <img
          src={image}
          alt="a girl managing its tasks"
          className="max-w-full"
        />
      </div>
    </div>
  );
}

export default Login;
