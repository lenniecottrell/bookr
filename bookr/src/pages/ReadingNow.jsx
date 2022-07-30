import React, {useState, useEffect} from 'react'
import { Box } from '@chakra-ui/react'
import CardGridShelf from '../components/CardGridShelf'
import EmptyShelf from '../components/EmptyShelf'
import axios from 'axios'
import { useToken } from '../hooks/useToken'

const ReadingNow = () => {
  const [books, setBooks] = useState([])
  const token = useToken().token

  useEffect(() => {

    axios.get(
      //google shelf ids (https://developers.google.com/books/docs/v1/using#ids):
      //To read = 2
      //Reading Now = 3
      //Have Read = 4
      'http://localhost:5000/get-shelf', {
        params: {
          shelfId: 3,
          token: token
        }
      })
      .then((response) => {
        console.log(response)
        setBooks(response.data) //array of objects
      })
      .catch((error) => {
        console.log(error)
      })
  },[])

  return (
    <Box textAlign="center">
      {books.length === 0 ? <EmptyShelf /> : <CardGridShelf books={books}/>}
    </Box>
  )
}

export default ReadingNow