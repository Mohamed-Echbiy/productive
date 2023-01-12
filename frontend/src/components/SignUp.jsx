import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Email, Password } from "../Icons";
import image from "../undraw_projections_re_ulc6.svg";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function Sign_Up(e) {
    e.preventDefault();
    setError("");

    const request = await fetch(
      "https://efficiency-api.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const response = await request.json();
    const msg = await response.msg;
    if (typeof response.msg === typeof "true") {
      return setError(msg);
    }
    //
  }
  console.log(error);
  return (
    <div className=" hero-container flex flex-row-reverse justify-around items-center">
      <div className="login-form flex justify-center flex-col max-w-sm px-2 m-auto lg:m-0">
        <h2 className=" text-3xl md:text-4xl mb-10 text-violet-600">SignUp</h2>

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
          onClick={Sign_Up}
        >
          SignUp
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

export default SignUp;
