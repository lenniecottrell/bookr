import React, {useEffect} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import GoogleAuth from './GoogleAuth';
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
} from '@chakra-ui/react'

const Nav = () => {

  useEffect(() => {
      google.accounts.id.renderButton(
      document.querySelector('.signIn'),
      {theme: 'outline', size: 'large'}
    )
  })

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
      <GoogleAuth />
    </Flex>
  )
}

export default Nav