import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'

const Nav = () => {
  return (
    <Flex className='nav' display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" m={5} px={5}>
      <Heading size="2xl">Bookr</Heading>
      <Spacer />
      <Container maxW="md" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Link as={RouterLink} to="/" mr={1}>Search</Link>
        <Menu>
          <MenuButton as={Button} bg="white" fontWeight="400">
            My Library
          </MenuButton>
          <MenuList>
            <MenuItem>Reading</MenuItem>
            <MenuItem>Want To Read</MenuItem>
            <MenuItem>Read</MenuItem>
            <MenuItem>New Shelf...</MenuItem>
          </MenuList>
        </Menu>

        <Link as={RouterLink} to="/about" ml={1} mr={2}>About</Link>
        <Link as={RouterLink} to="/account" ml={2}>Account</Link>
      </Container>
    </Flex>
  )
}

export default Nav