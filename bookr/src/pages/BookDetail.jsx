import React from 'react'
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from'@chakra-ui/react'

const BookDetail = ({isOpen, onClose, bookData, query}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="transparent"/>
      <ModalContent className="modal-content" boxShadow="base" bg="white">
        <ModalHeader>Book Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container display="flex" flexDirection="row">
            <Box>Book Cover</Box>
            <Box  display="flex" flexDirection="column">
              <Text>{bookData.title}</Text>
              <Text>Authors</Text>
              <Text>Year Published</Text>
              <Text>ISBN</Text>
              <Text>Language</Text>
            </Box>
          </Container>
          <Heading>Description</Heading>
          <Container>
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae saepe iure ipsa minus corrupti cupiditate hic excepturi quos aperiam voluptatem.</Text>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button>Add to my books</Button>
          <Link href={`https://www.overdrive.com/Search?q=${query}`}>Find in OverDrive</Link>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookDetail