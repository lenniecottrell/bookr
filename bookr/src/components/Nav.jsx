import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const Nav = () => {
  const {isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex className='nav' display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" m={5} px={5}>
      <Heading size="2xl">Bookr</Heading>
      <Spacer />
      <Container maxW="md" display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Link as={RouterLink} to="/" mr={5}>Search</Link>
        <Link as={RouterLink} to="/library" mx={5}>My Library</Link>
        <Link as={RouterLink} to="/about" mx={5}>About</Link>
        <Button bg="white" fontWeight="400" mx={2} onClick={onOpen}>Account</Button>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading>Hello World</Heading>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Log In</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Nav