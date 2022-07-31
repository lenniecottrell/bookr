import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import GoogleButton from 'react-google-button'
import GoogleAuth from './GoogleAuth'
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
} from '@chakra-ui/react'

const Nav = ({getAccessToken}) => {

  return (
    <Flex className='nav' display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" m={5} px={5}>
      <Heading size="2xl">Bookr</Heading>
      <Spacer />
      <Container maxW="md" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Link as={RouterLink} to="/" mr={5}>Search</Link>
        <Link as={RouterLink} to="/library" mx={5}>My Library</Link>
        <Link as={RouterLink} to="/about" mx={5}>About</Link>
        <Link as={RouterLink} to="/account" mx={5}>Account</Link>
      </Container>
      <GoogleButton onClick={() => getAccessToken()} />
      {/* Come back to this
      <GoogleAuth onClick={() => getAccessToken()} /> */}
    </Flex>
  )
}

export default Nav