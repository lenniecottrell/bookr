import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade } from '@chakra-ui/react'
import BookCard from './BookCard'
import axios from 'axios'

const CardGrid = ({query}) => {
  const [allBookData, setAllBookData] = useState([])
  const [allBookTitles, setAllBookTitles] = useState([])
  const [allBookAuthors, setAllBookAuthors] = useState([])
  const [allBookImages, setAllBookImages] = useState([])

  const titles = []
  const authors = []
  const images = []
  let cards = []
  let books = []

  const getBooks = () => {
    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      params: {
        q: query, 
        maxResults: 40
      }
    })
    .then((response) => {
      const allBooks = response.data.items
      //console.log(allBooks)
      for (let i = 0; i < allBooks.length; i++) {
        books.push(allBooks[i].volumeInfo)
        titles.push(allBooks[i].volumeInfo.title)
        authors.push(allBooks[i].volumeInfo.authors)
      }

      // //authorList is an inner array of authors. If there's more than one, add a space to each item
      // for (let authorList of authors) {
      //   if (authorList === undefined) {
      //     authorList = [""]
      //   }
      //   if (authorList.length > 1) {
      //     for (let i = 0; i < authorList.length - 1; i++) {
      //       authorList[i] += ", "
      //     }
      //   }
      // }
      
      // for (let i = 0; i < allBooks.length; i++) {
      //   if (allBooks[i].volumeInfo.imageLinks === undefined){
      //     images.push({smallThumbnail: "No Image Available", thumbnail: "No Image Available"})
      //     continue
      //   }
      //   images.push(allBooks[i].volumeInfo.imageLinks)
      // }
      setAllBookData(allBooks)
      // setAllBookTitles(titles)
      // setAllBookAuthors(authors)
      // setAllBookImages(images)
    })
    .catch((err) => {
      console.error(err);
    })
  }
  
  console.log(allBookData)
  useEffect(() => {
    //do nothing if the search box is empty
    if (query==="") {
      return
    }
    getBooks()
    for (let book of allBookData) {
        if (book.volumeInfo.imageLinks === undefined){
          book.volumeInfo.imageLinks = {smallThumbnail: "No Image Available", thumbnail: "No Image Available"}
        }
        if (book.volumeInfo.authors === undefined) {
          book.volumeInfo.authors = ""
        }
        if (book.volumeInfo.authors.length > 1) {
          for (let i = 0; i < book.volumeInfo.authors.length - 1; i++) {
          book.volumeInfo.authors[i] += ", "
          }
        }
      }
  }, [query, allBookData])


  // for (let i = 0; i < allBookData.length; i++) {
  //   cards.push(
  //     <SlideFade key={i} in={true}>
  //       <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
  //         <BookCard allBookData={allBookData[i]} title={allBookData[i].title} authors={allBookData[i].authors} image={allBookImages[i]}/>
  //       </GridItem>
  //     </SlideFade>
  //   )
  // }

  return (
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {allBookData.map((book) => {
        <SlideFade key={book.id} in={true}>
          <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
            <BookCard 
              bookData={book}
              title={book.volumeInfo.title}
              authors={JSON.stringify(book.volumeInfo.authors)}
              image={JSON.stringify(book.volumeInfo.imageLinks.thumbNail)}
            />
          </GridItem>
        </SlideFade>
        })

        }



      </SimpleGrid>
  )
}

export default CardGrid