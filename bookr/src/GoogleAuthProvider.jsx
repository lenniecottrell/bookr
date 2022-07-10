import React from 'react'
import {useGoogleLogin} from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext();
const GOOGLE_CLIENT_ID='618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com'


export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID
  })

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)

export default GoogleAuthProvider