import React from "react";
import { Box, Center, Image, Heading, Text } from "@chakra-ui/react";

const BookCard = ({ bookData }) => {
  return (
    <Center>
      <Box
        className="bookCard"
        pt="1rem"
        display="flex"
        flexDirection="column"
        gap={3}
        w="100%"
      >
        <Image
          boxSize="250px"
          objectFit="contain"
          src={bookData.volumeInfo.imageLinks.thumbnail}
          alt={bookData.volumeInfo.title}
          alignSelf="center"
        />
        <Box w="100%">
          <Heading size="sm" my={2} px={2} textAlign="center">
            {bookData.volumeInfo.title}
          </Heading>
          <Text size="md" mb={2} textAlign="center">
            {bookData.volumeInfo.authors}
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default BookCard;
