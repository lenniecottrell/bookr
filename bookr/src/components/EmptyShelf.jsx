import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Heading, LinkBox, LinkOverlay, Button} from '@chakra-ui/react'

const EmptyShelf = () => {
  return (
    <Box my={15} border="2px">
      <Heading size="xl" my={5}>There are no books on this shelf</Heading>
      <LinkBox as={Button} my={10} size="lg">
        <LinkOverlay as={RouterLink} to="/">Add one!</LinkOverlay>
      </LinkBox>
    </Box>
  )
}

export default EmptyShelf