import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade, useDisclosure } from '@chakra-ui/react'
import BookCard from './BookCard'
import BookDetail from '../pages/BookDetail'
import axios from 'axios'

const CardGridShelf = ({books}) => {
  console.log(books);
  //const [allBookData, setAllBookData] = useState([])
  const [selectedBook, setSelectedBook] = useState({})
  const {isOpen, onClose, onOpen} = useDisclosure()

  const handleClick = (item) => {
    console.log(item);
    setSelectedBook(item)
    onOpen()
  }
  
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
      {Object.keys(selectedBook).length > 0 && <BookDetail isOpen={isOpen} onClose={onClose} bookData={selectedBook}/>}
    </>
  )
}

export default CardGridShelf