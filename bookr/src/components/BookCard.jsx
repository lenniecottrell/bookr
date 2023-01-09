import React from "react";
import { Box, Center, Image, Heading, Text } from "@chakra-ui/react";
import noImage from "../images/no-image-icon-23494.png";

const BookCard = ({ bookData }) => {
  if (bookData.volumeInfo.imageLinks === undefined) {
    bookData.volumeInfo.imageLinks = [];
  }
  return (
    <Center>
      <Box
        className="bookCard"
        p="1rem"
        display="flex"
        flexDirection="column"
        gap={3}
        w="100%"
      >
        <Image
          //boxSize="250px"
          objectFit="contain"
          mx={6}
          src={bookData.volumeInfo.imageLinks.thumbnail || noImage}
          alt={bookData.volumeInfo.title}
          alignSelf="center"
        />
        <Box w="100%">
          <Heading size="sm" my={2} px={2} textAlign="center">
            {bookData.volumeInfo.title}
          </Heading>
          <Text fontSize="md" mb={2} textAlign="center">
            {bookData.volumeInfo.authors}
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default BookCard;
