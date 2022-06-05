import React from 'react'
import { SimpleGrid, GridItem, SlideFade } from '@chakra-ui/react'
import BookCard from './BookCard'

const CardGrid = ({allBookData, allBookTitles, allBookAuthors, allBookImages}) => {
  let cards = []
  for (let i = 0; i < allBookTitles.length; i++) {
    cards.push(
      <SlideFade key={i} in={true}>
        <GridItem className="gridItem" w='100%' h='100%' bg='gray.100' border="1px" borderRadius={6} >
          <BookCard allBookData={allBookData} title={allBookTitles[i]} authors={allBookAuthors[i]} image={allBookImages[i]}/>
        </GridItem>
      </SlideFade>
    )
  }

  return (
    <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
      {cards}
    </SimpleGrid>
  )
}

export default CardGrid