import React, {useEffect} from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'
import EmptyShelf from '../components/EmptyShelf'
import axios from 'axios'

const ReadingNow = ({token}) => {

  // useEffect((token) => {
  //   axios.get(
  //     'http://localhost:5000/get-shelf', {
  //       params: {
  //         shelfId: 3,
  //         token: token
  //       }
  //     })
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   },[token])

  return (
    <Container textAlign="center">
      <EmptyShelf />
    </Container>
  )
}

export default ReadingNow