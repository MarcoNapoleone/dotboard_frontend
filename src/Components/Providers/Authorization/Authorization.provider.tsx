import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../../../services/users.services";
import {getCookie} from "../../../services/connectors/cookies";


export const useAuthContext = createContext({
  loggedUser: null as User,
  setLoggedUser: (user: User) => {
  }
});

export function AuthProvider(props: { children?: React.ReactNode }) {
  const [loggedUser, setLoggedUser] = useState<User>(null)
  const loginValue = {loggedUser, setLoggedUser}
  return (
    <useAuthContext.Provider value={loginValue}>
      {props.children}
    </useAuthContext.Provider>
  );
}

export const useAuth = () => {
  return React.useContext(useAuthContext);
}

export const RequireAuth = ({children}: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie('token')) {
      navigate('/login');
    }
  }, [])

  return children;
}