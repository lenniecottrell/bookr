import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading
} from '@chakra-ui/react'

const Nav = () => {
  return (
    <Flex className='nav' display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" m={5} px={5}>
      <Heading size="2xl">Bookr</Heading>
      <Spacer />
      <Container maxW="md" display="flex" flexDirection="row" justifyContent="flex-end">
        <Link as={RouterLink} to="/">Search</Link>
        <p> / </p>
        <Link as={RouterLink} to="/library">My Library</Link>
        <p> / </p>
        <Link as={RouterLink} to="/about">About</Link>
        <p> / </p>
        <Link as={RouterLink} to="/account">Account</Link>
      </Container>
    </Flex>
  )
}

export default Nav