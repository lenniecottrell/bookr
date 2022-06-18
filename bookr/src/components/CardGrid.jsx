import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade, useDisclosure } from '@chakra-ui/react'
import BookCard from './BookCard'
import BookDetail from '../pages/BookDetail'
import axios from 'axios'

const CardGrid = ({query}) => {
  const [allBookData, setAllBookData] = useState({title: "hungry caterpillar", author: "richard scary?"})
  const [allBookTitles, setAllBookTitles] = useState([])
  const [allBookAuthors, setAllBookAuthors] = useState([])
  const [allBookImages, setAllBookImages] = useState([])
  const {isOpen, onClose} = useDisclosure()

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
      for (let i = 0; i < allBooks.length; i++) {
        books.push(allBooks[i].volumeInfo)
      }
      console.log(books)

      for (let i = 0; i < books.length; i++) {
        if (books[i].authors === undefined) {
          authors.push([" "])
          continue
        }
        authors.push(books[i].authors)
        titles.push(books[i].title)
      }

      //authorList is an inner array of authors. If there's more than one, add a space to each item
      for (let authorList of authors) {
        if (authorList.length > 1) {
          for (let i = 0; i < authorList.length - 1; i++) {
            authorList[i] += ", "
          }
        }
      }

      for (let i = 0; i < books.length; i++) {
        if (books[i].imageLinks === undefined){
          images.push({smallThumbnail: "No Image Available", thumbnail: "No Image Available"})
          continue
        }
        images.push(books[i].imageLinks)
      }
      setAllBookData(books)
      //setAllBookTitles(titles)
      //setAllBookAuthors(authors)
      setAllBookImages(images)
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    //do nothing if the search box is empty
    if (query==="") {
      return
    }
    getBooks()
  }, [query])


  for (let i = 0; i < allBookData.length; i++) {
    cards.push(
      <SlideFade key={i} in={true}>
        <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} >
          <BookCard allBookData={allBookData[i]} title={allBookData[i].title} authors={allBookData[i].authors} image={allBookImages[i]}/>
        </GridItem>
      </SlideFade>
    )
  }
  
  return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {cards}
      </SimpleGrid>
      <BookDetail isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default CardGrid