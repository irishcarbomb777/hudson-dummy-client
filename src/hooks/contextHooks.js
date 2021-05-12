import { useContext, createContext } from "react";

export const AuthenticationContext = createContext(null);

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
}

