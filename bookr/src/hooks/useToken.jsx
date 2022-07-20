import { createContext, useContext, useState} from 'react'

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