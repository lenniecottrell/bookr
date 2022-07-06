import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade } from '@chakra-ui/react'
import BookCard from './BookCard'
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
          console.log("IMAGES UNDEFINED")
          allBooks[i].volumeInfo.imageLinks = {smallThumbnail: "No Image Available", thumbnail: "No Image Available"}
          continue
        }
        if (allBooks[i].volumeInfo.authors === undefined) {
          allBooks[i].volumeInfo.authors = ["REPLACEMENT TEST"]
          continue
        }
        // If there's more than one, add a comma and a space to each item
        if (allBooks[i].volumeInfo.authors.length > 1) {
          for (let i = 0; i < allBooks[i].volumeInfo.authors.length - 1; i++) {
            allBooks[i].volumeInfo.authors += ", "
          }
        }
      }
      for (let book of allBooks) {
        console.log(book.volumeInfo.authors)
      }
      setAllBookData(allBooks)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [query])
  
  console.log(allBookData)

  return (
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {allBookData.map((book) => {
        <SlideFade key={book.id} in={true}>
          <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
            <BookCard 
              bookData={book}
              title={book.volumeInfo.title}
              authors={JSON.stringify(book.volumeInfo.authors)}
              image={book.volumeInfo.imageLinks}
            />
          </GridItem>
        </SlideFade>
        })

        }



      </SimpleGrid>
  )
}

export default CardGrid