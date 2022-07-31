import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import userReducer from "./userReducer";
import * as actions from "./actions";
import * as api from "../api";

const UserContext = createContext();

const initialUser = {
  username: null,
  fullName: null,
  age: null,
  favoriteColor: null,
};

export const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [user, dispatch] = useReducer(userReducer, initialUser);

  const setUser = async (token) => {
    setPending(true);

    if (token) {
      window.localStorage.setItem("token", token);
      // Use token to get user details from API.
      const res = await api.getUser();
      dispatch(actions.setUserData(res.data));
      setError(!res.success);
    } else {
      window.localStorage.clear();
      dispatch(actions.setUserData(initialUser));
    }

    setPending(false);
  };

  const updateUser = async (data) => {
    setPending(true);
    const res = await api.updateUser(data);
    setError(!res.success);
    dispatch(actions.setUserData(res.data));
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
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
