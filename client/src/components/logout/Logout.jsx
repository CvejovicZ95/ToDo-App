import React from 'react';
import { useLogout } from "../../hooks/useLogout";

export const Logout = () => {
  const { logoutHandler } = useLogout();

  return (
    <button onClick={logoutHandler} className='logout-btn'>
      Logout
    </button>
  );
};


