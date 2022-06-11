import React from 'react'
import Nav from '../components/Nav'
import {
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

const Account = () => {
  return (
    <div>
      <Nav />
      <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
        <Heading size="xl" mb={4} >Log In</Heading>
      </Container>
    </div>
  )
}

export default Account