import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
    const navigate = useNavigate(); // ✅ define setUser

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate('/'); // ✅ no more error here
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
      {/* <button onClick={logout}>Logout</button>; */}
    </UserContext.Provider>
      
  );
};
