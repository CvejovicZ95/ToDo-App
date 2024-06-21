import React from "react";
import "./LoginRegister.css";
import Login from "../loginRegister/login/Login";
import Register from "../loginRegister/register/Register";

export const LoginRegister = () => {
  return (
    <div className="login-register">
      <Login />
      <Register />
    </div>
  );
};
