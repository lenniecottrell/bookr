import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade, useDisclosure } from '@chakra-ui/react'
import BookCard from './BookCard'
import BookDetailShelf from '../pages/BookDetailShelf'

const CardGridShelf = ({books, shelfId}) => {
  const [selectedBook, setSelectedBook] = useState({})
  const {isOpen, onClose, onOpen} = useDisclosure()

  const handleClick = (item) => {
    setSelectedBook(item)
    onOpen()
  }

    // //TODO: this is copied from CardGrid - there's probably a DRY way to do this...

    // useEffect(() => {
    //   for (let i = 0; i < books.length; i++) {
    //     if (books[i].volumeInfo.imageLinks == undefined){
    //       books[i].volumeInfo.imageLinks = {smallThumbnail: "No Image Available", thumbnail: "No Image Available"}
    //     }
    //     if (books[i].volumeInfo.authors === undefined) {
    //       books[i].volumeInfo.authors = [""]
    //     }
    //     // If there's more than one, add a comma and a space to each item
    //     if (books[i].volumeInfo.authors.length > 1) {
    //       for (let j = 0; j < books[i].volumeInfo.authors.length - 1; j++) {
    //         books[i].volumeInfo.authors[j] += ", "
    //       }
    //     }
    //   }
    // })
      
      return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {books.map((book) => 
          <SlideFade key={book.id} in={true} onClick={()=>handleClick(book)}>
            <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
              <BookCard 
                bookData={book}
              />
            </GridItem>
          </SlideFade>
          )
        }
      </SimpleGrid>
      {Object.keys(selectedBook).length > 0 && <BookDetailShelf isOpen={isOpen} onClose={onClose} bookData={selectedBook} shelfId={shelfId}/>}
    </>
  )
}

export default CardGridShelf