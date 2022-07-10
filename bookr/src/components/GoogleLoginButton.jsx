import React from 'react'
import GoogleButton from 'react-google-button'
import { useGoogleAuth } from '../GoogleAuthProvider'

const GoogleLoginButton = () => {
  const {signIn} = useGoogleAuth();

  return (
    <GoogleButton onClick={signIn}/>
  )
}

export default GoogleLoginButton