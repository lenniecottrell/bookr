import React from 'react'
import {Button} from '@chakra-ui/react'

const SignOutButton = ({setUser}) => {

  const handleSignOut = () => setUser({});

  return (
    <Button onClick={handleSignOut}>Sign Out</Button>
  )
}

export default SignOutButton