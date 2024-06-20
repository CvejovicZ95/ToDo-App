import config from "../config.json";
const apiUrl = config.API_BASE_URL;

export const loginUser = async (username, password) => {
    try {
        const res = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.error){
            if (data.error === 'Wrong username or password') {
                throw new Error('Incorrect username or password');
            } else {
                throw new Error(data.error)
            }
        }
        return data
    } catch (error) {
        throw new Error(error.message);
    }   
}

export const logoutUser = async () => {
    try{
        const res = await fetch(`${apiUrl}/api/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const registerUser = async ({
    username,
    password,
    fullName,
}) => {
    try {
        const res = await fetch(`${apiUrl}/api/auth/register`, {
            method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        fullName,
      }),
    });
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
    } catch (error) {
        throw new Error(error.message)
    }
};

export const getAllUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };