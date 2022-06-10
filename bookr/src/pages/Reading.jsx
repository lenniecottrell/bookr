import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import { Container, Heading, Box } from '@chakra-ui/react'
import EmptyShelf from '../components/EmptyShelf'

const Reading = () => {
  return (
    <Container textAlign="center" border="2px">
      <EmptyShelf />
    </Container>
  )
}

export default Reading