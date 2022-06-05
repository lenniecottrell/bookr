import React from 'react'
import { Box, Center, Image, Heading, Text } from '@chakra-ui/react'

const BookCard = ({title, authors, image}) => {

  return (
    <Center>
      <Box className='bookCard' border-radius={10}>
        <Image src={image.thumbnail} alt={image.thumbnail} />
        <Heading size='md' my={2} textAlign="center">{title}</Heading>
        <Text size='md' textAlign="center">{authors}</Text>
      </Box>
    </Center>
  )
}

export default BookCard