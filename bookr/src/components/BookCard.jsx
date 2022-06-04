import React from 'react'
import { Image, Heading, Text } from '@chakra-ui/react'

const BookCard = ({title, authors}) => {
  return (
    <div className='bookCard'>
      <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      <Heading size='md' my={2} textAlign="center">{title}</Heading>
      <Text size='md' textAlign="center">{authors}</Text>
    </div>
  )
}

export default BookCard