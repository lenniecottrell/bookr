import { createContext, useContext, useState } from "react";
import axios from "axios";
//reference: https://egghead.io/lessons/react-store-a-token-globally-with-react-context-for-easier-use-anywhere-in-a-next-js-app
export const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  let existingToken;

  try {
    axios
      .get("/get-token")
      .then((res) => {
        //console.log(res);
        existingToken = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
