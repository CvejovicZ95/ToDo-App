import React from 'react';
import "./LoginRegister.css";
import Login from "../login/Login";
import Register from '../register/Register';

export const LoginRegister = () => {
  return (
    <div className='login-register'>
      <Login />
      <Register />
    </div>
  );
};

