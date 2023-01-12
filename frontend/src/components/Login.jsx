import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Email, Password } from "../Icons";
import image from "../undraw_projections_re_ulc6.svg";
import SortByDate from "./common/SortByDate";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserAuth, userAuth } = useContext(AuthContext);

  async function login_In(e) {
    e.preventDefault();
    localStorage.clear();
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

    if (typeof response.msg === typeof "true") {
      return setError(response.msg);
    }
    if (response.msg === true) {
      localStorage.setItem("token", response.token);
      if (!localStorage.getItem("sortByDate")) {
        localStorage.setItem("sortByDate", "asc");
      }
      if (!localStorage.getItem("priority")) {
        localStorage.setItem("priority", "all");
      }
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
        <div className="inputField relative mb-5">
          <TextField
            fullWidth
            type="email"
            name="email"
            id="email"
            color="secondary"
            variant="outlined"
            label="Email"
            size="medium"
            value={email}
            placeholder="demo@demo.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            error={error ? error : false}
            helperText={error ? error : false}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputField relative mb-5">
          <TextField
            fullWidth
            type="password"
            name="password"
            value={password}
            id="password"
            placeholder="demo"
            label="Password"
            color="secondary"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={login_In}
        >
          Login
        </Button>
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
