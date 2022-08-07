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
  setReadingNowList,
  setHaveReadList,
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
        console.log(response.data.bookResponse);
        let updatedBookList = response.data.bookResponse;
        //To read = 2
        //Reading Now = 3
        //Have Read = 4
        if (updatedBookList === undefined) {
          updatedBookList = [];
        }
        switch (response.data.shelfResponse) {
          case "2":
            setToReadList(updatedBookList);
            break;
          case "3":
            setReadingNowList(updatedBookList);
            break;
          case "4":
            setHaveReadList(updatedBookList);
            break;
        }
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay bg="transparent" />
      <ModalContent className="modal-content" boxShadow="base" bg="white">
        <ModalHeader>{bookData.volumeInfo.title}</ModalHeader>
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
              {/* <Text>{bookData.volumeInfo.title}</Text> */}
              <Text mb={1} fontSize="lg">
                {bookData.volumeInfo.authors}
              </Text>
              <Text my={0.5}>
                Published {bookData.volumeInfo.publishedDate}
              </Text>
              <Text my={0.5}>
                ISBN: {bookData.volumeInfo.industryIdentifiers[0].identifier}
              </Text>
              <Text my={0.5}>{bookData.volumeInfo.language}</Text>
            </Box>
          </Container>
          <Heading size="sm" mt={5} mb={3}>
            Description
          </Heading>
          <Container>
            <Text>{bookData.volumeInfo.description}</Text>
          </Container>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between" gap="10px">
          <Button onClick={() => removeBook(bookData.id, shelfId, token)}>
            Remove from shelf
          </Button>
          <LinkBox>
            <Button colorScheme="telegram">
              Find in OverDrive
              <LinkOverlay
                href={`https://www.overdrive.com/Search?q=${bookData.volumeInfo.title}`}
                isExternal
              ></LinkOverlay>
            </Button>
          </LinkBox>
          <Button onClick={onClose} colorScheme="red">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookDetailShelf;
