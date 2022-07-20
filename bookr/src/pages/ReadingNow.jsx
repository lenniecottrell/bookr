import React, {useEffect, useContext} from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'
import EmptyShelf from '../components/EmptyShelf'
import axios from 'axios'
import { useToken } from '../hooks/useToken'

const ReadingNow = () => {
  // const tokenValue = useToken().token
  // console.log(tokenValue)

  axios.get(
    'http://localhost:5000/get-shelf', {
      params: {
        shelfId: 2,
        token: useToken().token
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })


  return (
    <Container textAlign="center">
      <EmptyShelf />
    </Container>
  )
}

export default ReadingNow