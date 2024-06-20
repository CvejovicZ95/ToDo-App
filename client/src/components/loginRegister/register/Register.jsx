import React, { useState } from "react";
import { useRegister } from "../../../hooks/useRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const { registration, registerClient} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerClient({
            username,
            password,
            fullName
        });
    };

  return (
    <div>
      <h2 className='heading'>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newUsername">Choose a username:</label>
        <input 
            type="text" 
            id="newUsername" 
            name="newUsername"
            onChange={(e) => setUsername(e.target.value)} 
        />
        <br />
        <label htmlFor="newPassword">Choose a password:</label>
        <input 
            type="password" 
            id="newPassword" 
            name="newPassword"
            onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <label htmlFor="Name">Full Name:</label>
        <input 
            type="name" 
            id="name" 
            name="name"
            onChange={(e) => setFullName(e.target.value)} 
        />
        <br />
        <button type="submit">Register</button>

        {registration && (
          <p style={{ color: "green", fontSize: "22px" }}>
            Registration successfull!
          </p>
        )}

        <ToastContainer/>
      </form>
    </div>
  );
};

export default Register;
