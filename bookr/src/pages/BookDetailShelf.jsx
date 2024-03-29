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
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { InfoOutlineIcon, ChevronDownIcon } from "@chakra-ui/icons";

const BookDetailShelf = ({
  isOpen,
  onClose,
  bookData,
  shelfId,
  handleUpdateShelf,
}) => {
  const token = useToken().token;
  const toast = useToast();

  const removeBook = (bookId, shelfId, token) => {
    axios
      .get("/remove-book", {
        params: {
          shelfId: shelfId,
          token: token,
          bookId: bookId,
        },
      })
      .then((response) => {
        //response.data has the new book list in it
        let updatedBookList = response.data.bookResponse;
        if (updatedBookList === undefined) {
          updatedBookList = [];
        }
        handleUpdateShelf(response.data.shelfResponse, updatedBookList);
        toast({
          title: "Book removed!",
          status: "success",
          duration: 2000,
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

  const addToShelf = (bookId, shelfId, token) => {
    axios
      .get("/add-to-shelf", {
        params: {
          bookId: bookId,
          shelfId: shelfId,
          token: token,
        },
      })
      .then((response) => {
        //console.log(response);
        let updatedBookList = response.data.bookResponse;
        if (updatedBookList === undefined) {
          updatedBookList = [];
        }
        handleUpdateShelf(
          response.data.shelfResponse,
          response.data.bookResponse
        );
        toast({
          title: "Book added!",
          status: "success",
          duration: 2000,
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
  };

  const moveToShelf = (bookId, shelfId, futureShelfId, token) => {
    removeBook(bookId, shelfId, token);
    addToShelf(bookId, futureShelfId, token);
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
            <Box display="flex" flexDirection="column" ml={{ base: 1, sm: 2 }}>
              <Text mb={1} fontSize={{ base: "md", md: "lg" }}>
                {bookData.volumeInfo.authors}
              </Text>
              <Box my={0.5} fontSize="md">
                <Text fontStyle={"italic"}>Published: </Text>
                {bookData.volumeInfo.publishedDate === "0000"
                  ? "Not available"
                  : bookData.volumeInfo.publishedDate}
              </Box>
              <Box my={0.5} fontSize="md">
                <Text fontStyle={"italic"}>ISBN: </Text>
                {bookData.volumeInfo.industryIdentifiers[0].identifier}
              </Box>
              <Text my={0.5} fontSize="md">
                {bookData.volumeInfo.language}
              </Text>
            </Box>
          </Container>
          <Heading size="sm" mt={5} mb={3}>
            Description
            <Tooltip
              label="Hey! Why is the description cut off? Turns out the Google Books API returns a truncated description when using an authenticated call, but the full description when using a generic call."
              fontSize="sm"
              bg="gray.100"
              color="black"
            >
              <InfoOutlineIcon ml={2} />
            </Tooltip>
          </Heading>
          <Container>
            <Text fontSize="md">{bookData.volumeInfo.description}</Text>
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
              Move or Remove
            </MenuButton>
            <MenuList>
              <MenuGroup title="Move book" ml="8px">
                <MenuItem
                  isDisabled={shelfId === 2}
                  onClick={() => moveToShelf(bookData.id, shelfId, 2, token)}
                >
                  To Read
                </MenuItem>
                <MenuItem
                  isDisabled={shelfId === 3}
                  onClick={() => moveToShelf(bookData.id, shelfId, 3, token)}
                >
                  Reading Now
                </MenuItem>
                <MenuItem
                  isDisabled={shelfId === 4}
                  onClick={() => moveToShelf(bookData.id, shelfId, 4, token)}
                >
                  Have Read
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                onClick={() => removeBook(bookData.id, shelfId, token)}
                color="red"
              >
                Remove from shelf
              </MenuItem>
            </MenuList>
          </Menu>
          <LinkBox width={{ base: "80%", md: "auto" }}>
            <Button colorScheme="telegram" width={{ base: "100%", md: "auto" }}>
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

export default BookDetailShelf;
