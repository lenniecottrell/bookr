import React from 'react'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Image,
  LinkOverlay,
  LinkBox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from'@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

const BookDetail = ({isOpen, onClose, bookData, query}) => {

  //I'll need this later: https://www.andiamo.co.uk/resources/iso-language-codes/

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="transparent"/>
      <ModalContent className="modal-content" boxShadow="base" bg="white">
        <ModalHeader>Book Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container display="flex" flexDirection="row">
            <Box>
              <Image boxSize="250px" objectFit="contain" src={bookData.volumeInfo.imageLinks.thumbnail} alt={bookData.volumeInfo.title} alignSelf="center"/>
            </Box>
            <Box  display="flex" flexDirection="column">
              <Text>{bookData.volumeInfo.title}</Text>
              <Text>{bookData.volumeInfo.authors}</Text>
              <Text>{bookData.volumeInfo.publishedDate}</Text>
              <Text>{bookData.volumeInfo.industryIdentifiers[0].identifier}</Text>
              <Text>{bookData.volumeInfo.language}</Text>
            </Box>
          </Container>
          <Heading size="sm">Description</Heading>
          <Container>
            <Text>{bookData.volumeInfo.description}</Text>
          </Container>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Add to My Library
            </MenuButton>
            <MenuList>
              <MenuItem>Reading Now</MenuItem>
              <MenuItem>To Read</MenuItem>
              <MenuItem>Have Read</MenuItem>
            </MenuList>
          </Menu>
          <LinkBox>
            <Button>Find in OverDrive
              <LinkOverlay href={`https://www.overdrive.com/Search?q=${bookData.volumeInfo.title}`} isExternal></LinkOverlay>
            </Button>
          </LinkBox>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookDetail