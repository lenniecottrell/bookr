import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BookCard from './BookCard'

const CardGrid = ({allBookData, allBookTitles, allBookAuthors, allBookImages}) => {
  let cards = []
  for (let i = 0; i < allBookTitles.length; i++) {
    cards.push(
      <GridItem w='100%' h='auto' bg='green.200' border="2px" borderRadius={10} key={i}>
        <BookCard allBookData={allBookData} title={allBookTitles[i]} authors={allBookAuthors[i]} image={allBookImages[i]}/>
      </GridItem>
    )
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6} m="2rem">
      {cards}
    </Grid>
  )
}

export default CardGrid