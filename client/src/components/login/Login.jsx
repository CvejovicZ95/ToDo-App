import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginHandler } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(username, password);
  }

  return (
    <div>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          name="username"
          onChange={(e) => setUsername(e.target.value)} 
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button type="submit">Login</button>

        <ToastContainer/>
      </form>
    </div>
  );
};

export default Login;
