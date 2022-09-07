import { createContext, useContext, useState } from "react";
import axios from "axios";
//reference: https://egghead.io/lessons/react-store-a-token-globally-with-react-context-for-easier-use-anywhere-in-a-next-js-app
export const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  let existingToken;

  try {
    if (window.localStorage.getItem("token").length > 0) {
      existingToken = window.localStorage.getItem("token");
    } else existingToken = "";
  } catch (error) {
    console.error(error);
  }

  const [token, setToken] = useState(existingToken || null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
