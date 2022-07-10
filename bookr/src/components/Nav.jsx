import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import GoogleLoginButton from './GoogleLoginButton'
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
} from '@chakra-ui/react'

const Nav = () => {
  return (
    <Flex className='nav' display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start" m={5} px={5}>
        <Heading size="2xl">Bookr</Heading>
        <Spacer />
        <Flex flexDir="column" alignItems="flex-end">
          <Container maxW="md" my={4} display="flex" flexDirection="row" justifyContent="flex-end">
            <Link as={RouterLink} to="/" mr={5}>Search</Link>
            <Link as={RouterLink} to="/library" mx={5}>My Library</Link>
            <Link as={RouterLink} to="/about" mx={5}>About</Link>
            <Link as={RouterLink} to="/account" mx={5}>Account</Link>
          </Container>
          <GoogleLoginButton />
        </Flex>
    </Flex>
  )
}

export default Nav