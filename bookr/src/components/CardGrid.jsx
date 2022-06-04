import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import BookCard from './BookCard'

const CardGrid = ({allBookData, allBookTitles, allBookAuthors}) => {
  let cards = []
  for (let i = 0; i < allBookTitles.length; i++) {
    cards.push(
      <GridItem w='100%' h='100%' bg='green.200' borderRadius={10} key={i}>
        <BookCard allBookData={allBookData} title={allBookTitles[i]} authors={allBookAuthors[i]}/>
      </GridItem>
    )
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6} m="2rem">
      {cards}
    </Grid>
  )
}

  {/* // return (
  //   <Grid templateColumns='repeat(4, 1fr)' gap={6} m="2rem">
  //     <GridItem w='100%' h='100%' bg='green.200' borderRadius={10}>
  //       <BookCard allBookData={allBookData}/>
  //     </GridItem>
  //     <GridItem w='100%' h='100%' bg='green.200' borderRadius={10}>
  //       <BookCard allBookData={allBookData}/>
  //     </GridItem>
  //     <GridItem w='100%' h='100%' bg='green.200' borderRadius={10}>
  //       <BookCard allBookData={allBookData}/>
  //     </GridItem>
  //     <GridItem w='100%' h='100%' bg='green.200' borderRadius={10}>
  //       <BookCard allBookData={allBookData}/>
  //     </GridItem>
  //     <GridItem w='100%' h='100%' bg='green.200' borderRadius={10}>
  //       <BookCard allBookData={allBookData}/>
  //     </GridItem>

  //   </Grid>
  // ) */}


export default CardGrid