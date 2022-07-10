import React from 'react'
import GoogleButton from 'react-google-button'
import { useGoogleAuth } from '../GoogleAuthProvider'

const GoogleLogoutButton = () => {
  const {signOut} = useGoogleAuth();

  return (
    <GoogleButton onClick={signOut}/>
  )
}

export default GoogleLogoutButton