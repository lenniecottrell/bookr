import React from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";
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
  useToast,
} from "@chakra-ui/react";

const BookDetailShelf = ({
  isOpen,
  onClose,
  bookData,
  shelfId,
  setToReadList,
}) => {
  const token = useToken().token;
  const toast = useToast();

  const removeBook = (bookId, shelfId, token) => {
    if (!token) {
      alert("You need to sign in to remove books from your library");
      return;
    }

    axios
      .get("http://localhost:5000/remove-book", {
        params: {
          shelfId: shelfId,
          token: token,
          bookId: bookId,
        },
      })
      .then((response) => {
        //response.data has the new book list in it
        console.log(response);
        setToReadList(response.data);
        toast({
          title: "Book removed!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Uh oh. Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="transparent" />
      <ModalContent className="modal-content" boxShadow="base" bg="white">
        <ModalHeader>Book Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container display="flex" flexDirection="row">
            <Box>
              <Image
                boxSize="250px"
                objectFit="contain"
                src={bookData.volumeInfo.imageLinks.thumbnail}
                alt={bookData.volumeInfo.title}
                alignSelf="center"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Text>{bookData.volumeInfo.title}</Text>
              <Text>{bookData.volumeInfo.authors}</Text>
              <Text>{bookData.volumeInfo.publishedDate}</Text>
              <Text>
                {bookData.volumeInfo.industryIdentifiers[0].identifier}
              </Text>
              <Text>{bookData.volumeInfo.language}</Text>
            </Box>
          </Container>
          <Heading size="sm">Description</Heading>
          <Container>
            <Text>{bookData.volumeInfo.description}</Text>
          </Container>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button onClick={() => removeBook(bookData.id, shelfId, token)}>
            Remove from shelf
          </Button>
          <LinkBox>
            <Button>
              Find in OverDrive
              <LinkOverlay
                href={`https://www.overdrive.com/Search?q=${bookData.volumeInfo.title}`}
                isExternal
              ></LinkOverlay>
            </Button>
          </LinkBox>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookDetailShelf;
