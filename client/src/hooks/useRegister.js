import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { registerUser } from "../api/usersApi";
import { useState } from "react";
import { setCookie } from "./useSetCookie";

export const useRegister = () => {
  const [registration, setRegistration] = useState(false);
  const { register } = useAuthContext();

  const registerClient = async ({ username, password, fullName }) => {
    const success = handleErrors({
      username,
      password,
      fullName,
    });
    if (!success) return;

    try {
      const data = await registerUser({
        username,
        password,
        fullName,
      });
      register(data);
      setCookie("token", data.token, 30);
      setRegistration(true);
    } catch (error) {
      setRegistration(false);
      toast.error(error.message);
    }
  };

  return { registration, registerClient };
};

function handleErrors({ username, password, fullName }) {
  if (!username || !password || !fullName) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (username.length < 4) {
    toast.error("Username must be at least 4 characters");
    return false;
  }

  if (fullName.length < 6) {
    toast.error("Full name must be at least 6 characters");
    return false;
  }

  return true;
}
