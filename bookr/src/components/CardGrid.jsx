import React, {useEffect, useState} from 'react'
import { SimpleGrid, GridItem, SlideFade } from '@chakra-ui/react'
import BookCard from './BookCard'
import axios from 'axios'

const CardGrid = ({query}) => {
  const [allBookData, setAllBookData] = useState({title: "hungry caterpillar", author: "richard scary?"})
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
      for (let i = 0; i < allBooks.length; i++) {
        books.push(allBooks[i].volumeInfo)
      }
      console.log(books[0])
      for (let i = 0; i < allBooks.length; i++) {
        titles.push(allBooks[i].volumeInfo.title)
      }
      for (let i = 0; i < allBooks.length; i++) {
        authors.push(allBooks[i].volumeInfo.authors)
      }
      console.log(authors)
      //authorList is an inner array of authors. If there's more than one, add a space to each item
      for (let authorList of authors) {
        if (authorList === undefined) {
          authorList = [""]
        }
        if (authorList.length > 1) {
          for (let i = 0; i < authorList.length - 1; i++) {
            authorList[i] += ", "
          }
        }
      }
      
      for (let i = 0; i < allBooks.length; i++) {
        if (allBooks[i].volumeInfo.imageLinks === undefined){
          images.push({smallThumbnail: "No Image Available", thumbnail: "No Image Available"})
          continue
        }
        images.push(allBooks[i].volumeInfo.imageLinks)
      }
      setAllBookData(books)
      setAllBookTitles(titles)
      setAllBookAuthors(authors)
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
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {cards}
      </SimpleGrid>
  )
}

export default CardGrid