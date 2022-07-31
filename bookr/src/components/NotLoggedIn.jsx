import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Heading, LinkBox, LinkOverlay, Button} from '@chakra-ui/react'

const NotLoggedIn = () => {
  return (
    <Box my={15}>
      <Heading size="xl" my={5}>You need to be logged in to view your shelves</Heading>
      <LinkBox as={Button} my={10} size="lg">
        <LinkOverlay as={RouterLink} to="/">Add one!</LinkOverlay>
      </LinkBox>
    </Box>
  )
}

export default NotLoggedIn