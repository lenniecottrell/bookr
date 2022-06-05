import React from 'react'
import { Box, Center, Image, Heading, Text } from '@chakra-ui/react'

const BookCard = ({title, authors, image}) => {

  return (
    <Center>
      <Box className='bookCard' pt='1rem' display="flex" flexDirection="column" gap={3} w="100%">
        <Image boxSize="250px" objectFit="contain" src={image.thumbnail} alt={image.thumbnail} alignSelf="center"/>
        <Box w="100%">
          <Heading size='sm' my={2} px={2} textAlign="center">{title}</Heading>
          <Text size='md' mb={2} textAlign="center">{authors}</Text>
        </Box>
      </Box>
    </Center>
  )
}

export default BookCard