import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUserRaw] = useState(null);

  const setUser = async (token) => {
    setPending(true);
    window.localStorage.setItem("token", token);

    const res = await api.getUser();
    setUserRaw(res.data || null);
    setError(!res.success);
    setPending(false);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setUser(token);
  }, []);

  return (
    <UserContext.Provider
      value={{
        pending,
        error,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
