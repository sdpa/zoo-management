import React, { createContext, useState } from "react";

export const UserContext = createContext(); 

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({ name: sessionStorage.getItem("username"), auth: sessionStorage.getItem("auth") === 'true' });

  const login = (name) => {
    setUser(() => ({
      name: name,
      auth: true,
    }));
    sessionStorage.setItem('username', name);
    sessionStorage.setItem('auth', true); 
  };

  const logout = () => {
    setUser(() => ({
      name: 'guest',
      auth: false,
    }));
    sessionStorage.setItem('username', "guest");
    sessionStorage.setItem('auth', false); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}