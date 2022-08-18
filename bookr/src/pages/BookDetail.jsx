import React, { useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import AlertDialogComponent from "../components/AlertDialog";

import { ChevronDownIcon } from "@chakra-ui/icons";

const BookDetail = ({ isOpen, onClose, bookData }) => {
  const [alertIsOpen, setAlertIsOpen] = useState(true);
  const token = useToken().token;
  const toast = useToast();

  //I'll need this later: https://www.andiamo.co.uk/resources/iso-language-codes/

  //google shelf ids (https://developers.google.com/books/docs/v1/using#ids):
  //To read = 2
  //Reading Now = 3
  //Have Read = 4
  const addToShelf = (bookId, shelfId, token) => {
    //TODO maaaaaybe come back to this
    //     if (!token) {
    // alert("You need to sign in to add books to your library");
    //     }

    if (!!token) {
      axios
        .get("http://localhost:5000/add-to-shelf", {
          params: {
            bookId: bookId,
            shelfId: shelfId,
            token: token,
          },
        })
        .then((response) => {
          console.log(response);
          toast({
            title: "Book added!",
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
            status: error,
            duration: 5000,
            isClosable: true,
          });
        });
    }
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
            <Box display="flex" flexDirection="column" ml={2}>
              <Text mb={1} fontSize="lg">
                {bookData.volumeInfo.authors}
              </Text>
              <Box my={0.5}>
                <Text fontStyle={"italic"}>Published:</Text>{" "}
                {bookData.volumeInfo.publishedDate}
              </Box>
              <Box my={0.5}>
                <Text fontStyle={"italic"}>ISBN:</Text>{" "}
                {bookData.volumeInfo.industryIdentifiers[0].identifier}
              </Box>
              <Box my={0.5}>
                <Text fontStyle={"italic"}>Language: </Text>
                {bookData.volumeInfo.language}
              </Box>
            </Box>
          </Container>
          <Heading size="sm" mt={5} mb={3}>
            Description
          </Heading>
          <Container>
            <Text>{bookData.volumeInfo.description}</Text>
          </Container>
        </ModalBody>
        <ModalFooter
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap="10px"
        >
          <Menu>
            <MenuButton
              as={Button}
              width={{ base: "80%", md: "auto" }}
              rightIcon={<ChevronDownIcon mt={1} />}
            >
              Add to My Library
            </MenuButton>
            <MenuList>
              <MenuItem
                isDisabled={!token ? true : false}
                onClick={() => addToShelf(bookData.id, 2, token)}
              >
                To Read
              </MenuItem>
              <MenuItem
                isDisabled={!token ? true : false}
                onClick={() => addToShelf(bookData.id, 3, token)}
              >
                Reading Now
              </MenuItem>
              <MenuItem
                isDisabled={!token ? true : false}
                onClick={() => addToShelf(bookData.id, 4, token)}
              >
                Have Read
              </MenuItem>
            </MenuList>
          </Menu>
          <LinkBox width={{ base: "80%", md: "auto" }}>
            <Button colorScheme="telegram" width={{ base: "80%", md: "auto" }}>
              Find in OverDrive
              <LinkOverlay
                href={`https://www.overdrive.com/Search?q=${bookData.volumeInfo.title}`}
                isExternal
              ></LinkOverlay>
            </Button>
          </LinkBox>
          <Button
            onClick={onClose}
            colorScheme="red"
            width={{ base: "80%", md: "auto" }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookDetail;
