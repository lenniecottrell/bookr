import { createContext, useContext, useState} from 'react'
//reference: https://egghead.io/lessons/react-store-a-token-globally-with-react-context-for-easier-use-anywhere-in-a-next-js-app
export const TokenContext = createContext(null)

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  return(
    <TokenContext.Provider value={{token, setToken}}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => useContext(TokenContext)