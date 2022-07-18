import React from 'react'
import axios from 'axios'
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

const BookDetail = ({isOpen, onClose, bookData, token}) => {

  //I'll need this later: https://www.andiamo.co.uk/resources/iso-language-codes/

  //google shelf ids (https://developers.google.com/books/docs/v1/using#ids):
    //To read = 2
    //Reading Now = 3
    //Have Read = 4
  const addToShelf = (bookId, shelfId) => {
    if (shelfId === 2) {
      console.log(bookId, shelfId)
      axios.post(
        'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/addVolume',
        {
          volumeId: bookId,
          key: process.env.REACT_APP_API_KEY
        }
      ).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error)
      })
    } else if (shelfId === 3) {
      console.log(bookId, shelfId)
    } else if (shelfId === 4) {
      console.log(bookId, shelfId)
    }
  }

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
              <MenuItem onClick={() => addToShelf(bookData.id, 2)}>To Read</MenuItem>
              <MenuItem onClick={() => addToShelf(bookData.id, 3)}>Reading Now</MenuItem>
              <MenuItem onClick={() => addToShelf(bookData.id, 4)}>Have Read</MenuItem>
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