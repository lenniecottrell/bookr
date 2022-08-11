import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookDetailShelf from "../pages/BookDetailShelf";
import {
  SimpleGrid,
  GridItem,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";

const CardGridShelf = ({
  books,
  shelfId,
  setToReadList,
  setReadingNowList,
  setHaveReadList,
}) => {
  const [selectedBook, setSelectedBook] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (item) => {
    setSelectedBook(item);
    onOpen();
  };
  console.log(books);

  return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {books.map((book) => (
          <SlideFade key={book.id} in={true} onClick={() => handleClick(book)}>
            <GridItem
              className="gridItem"
              boxShadow="lg"
              w="100%"
              h="100%"
              bg="gray.100"
              borderRadius={6}
            >
              <BookCard bookData={book} />
            </GridItem>
          </SlideFade>
        ))}
      </SimpleGrid>
      {Object.keys(selectedBook).length > 0 && (
        <BookDetailShelf
          isOpen={isOpen}
          onClose={onClose}
          bookData={selectedBook}
          shelfId={shelfId}
          setToReadList={setToReadList}
          setReadingNowList={setReadingNowList}
          setHaveReadList={setHaveReadList}
        />
      )}
    </>
  );
};

export default CardGridShelf;
