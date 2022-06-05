import React from 'react'
import { Grid, GridItem, SlideFade } from '@chakra-ui/react'
import BookCard from './BookCard'

const CardGrid = ({allBookData, allBookTitles, allBookAuthors, allBookImages}) => {
  let cards = []
  for (let i = 0; i < allBookTitles.length; i++) {
    cards.push(
      <SlideFade key={i} in={true}>
        <GridItem className="gridItem" w='100%' h='auto' bg='red.50' border="1px" borderRadius={10} >
          <BookCard allBookData={allBookData} title={allBookTitles[i]} authors={allBookAuthors[i]} image={allBookImages[i]}/>
        </GridItem>
      </SlideFade>
    )
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6} m="2rem">
      {cards}
    </Grid>
  )
}

export default CardGrid