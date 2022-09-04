import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  GridItem,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookDetail from "../pages/BookDetail";
import axios from "axios";

const CardGrid = ({ query, sort }) => {
  const [allBookData, setAllBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    //do nothing if the search box is empty
    if (query === "") {
      return;
    }
    axios({
      url: "https://www.googleapis.com/books/v1/volumes",
      params: {
        q: query,
        maxResults: 40,
      },
    })
      .then((response) => {
        const allBooks = response.data.items;
        //handle undefined book data
        //imageLinks, publishedDate, industryIdentifiers, language, title, authors,
        for (let i = 0; i < allBooks.length; i++) {
          if (allBooks[i].volumeInfo.imageLinks == undefined) {
            allBooks[i].volumeInfo.imageLinks = {
              smallThumbnail: "No Image Available",
              thumbnail: "No Image Available",
            };
          }
          if (!allBooks[i].volumeInfo.hasOwnProperty("publishedDate")) {
            allBooks[i].volumeInfo["publishedDate"] = "0000";
          }
          if (!allBooks[i].volumeInfo.hasOwnProperty("industryIdentifiers")) {
            allBooks[i].volumeInfo["industryIdentifiers"] = [""];
          }
          if (!allBooks[i].volumeInfo.hasOwnProperty("language")) {
            allBooks[i].volumeInfo["language"] = "";
          }
          //there's no way a book will be missing a title property
          if (!allBooks[i].volumeInfo.hasOwnProperty("authors")) {
            allBooks[i].volumeInfo["authors"] = [""];
          }
          // If there's more than one author, add a comma and a space to each item except the last
          if (allBooks[i].volumeInfo.authors.length > 1) {
            for (
              let j = 0;
              j < allBooks[i].volumeInfo.authors.length - 1;
              j++
            ) {
              allBooks[i].volumeInfo.authors[j] += ", ";
            }
          }
        }
        sortData(sort, allBooks);
        setAllBookData(allBooks);
        setSelectedBook(allBooks[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query, sort]);

  const handleClick = (item) => {
    setSelectedBook(item);
    onOpen();
  };
  // sort by year
  // TODO: include month and day in sorting
  const sortData = (sort, data) => {
    const sortedBooks = data.sort((a, b) => {
      if (sort === "newest") {
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
      } else if (sort === "oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
      }
    });
    return sortedBooks;
  };

  return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {allBookData.map((book) => (
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
        <BookDetail isOpen={isOpen} onClose={onClose} bookData={selectedBook} />
      )}
    </>
  );
};

export default CardGrid;
