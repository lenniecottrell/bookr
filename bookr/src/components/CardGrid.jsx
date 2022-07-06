import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade, useDisclosure } from '@chakra-ui/react'
import BookCard from './BookCard'
import BookDetail from '../pages/BookDetail'
import axios from 'axios'

const CardGrid = ({query}) => {
  const [allBookData, setAllBookData] = useState([])

  useEffect(() => {
    //do nothing if the search box is empty
    if (query==="") {
      return
    }
    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      params: {
        q: query, 
        maxResults: 40
      }
    })
    .then((response) => {
      const allBooks = response.data.items
      for (let i = 0; i < allBooks.length; i++) {
        if (allBooks[i].volumeInfo.imageLinks == undefined){
          //console.log("IMAGES UNDEFINED")
          allBooks[i].volumeInfo.imageLinks = {smallThumbnail: "No Image Available", thumbnail: "No Image Available"}
        }
        if (allBooks[i].volumeInfo.authors === undefined) {
          allBooks[i].volumeInfo.authors = [""]
        }
        // If there's more than one, add a comma and a space to each item
        if (allBooks[i].volumeInfo.authors.length > 1) {
          for (let j = 0; j < allBooks[i].volumeInfo.authors.length - 1; j++) {
            allBooks[i].volumeInfo.authors[j] += ", "
          }
        }
      }
      // for (let book of allBooks) {
      //   console.log(book.volumeInfo.authors)
      // }
      setAllBookData(allBooks)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [query])
  
  //console.log(allBookData)

  return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {allBookData.map((book) => 
        <SlideFade key={book.id} in={true}>
          <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
            <BookCard 
              bookData={book}
            />
          </GridItem>
        </SlideFade>
        )

        }



      </SimpleGrid>
      <BookDetail isOpen={isOpen} onClose={onClose} bookData={allBookData} query={query}/>
    </>
  )
}

export default CardGrid