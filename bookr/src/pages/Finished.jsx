import React from 'react'
import EmptyShelf from '../components/EmptyShelf'
import {Container} from '@chakra-ui/react'

const Finished = () => {
  return (
    <Container textAlign="center" border="2px">
      <EmptyShelf />
    </Container>
  )
}

export default Finished