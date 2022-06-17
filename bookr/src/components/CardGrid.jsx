import React, {Suspense} from 'react'
import { SimpleGrid, GridItem, SlideFade, useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
 } from '@chakra-ui/react'
import BookCard from './BookCard'
import BookDetail from '../pages/BookDetail'

const CardGrid = ({allBookData, allBookTitles, allBookAuthors, allBookImages}) => {
  const { onOpen,isOpen, onClose } = useDisclosure();
  let cards = []
  for (let i = 0; i < allBookTitles.length; i++) {
    cards.push(
      <SlideFade key={i} in={true}>
        <GridItem className="gridItem" boxShadow="lg" w='100%' h='100%' bg='gray.100' borderRadius={6} onClick={onOpen}>
          <BookCard allBookData={allBookData} title={allBookTitles[i]} authors={allBookAuthors[i]} image={allBookImages[i]}/>
        </GridItem>
      </SlideFade>
    )
  }
  
  return (
    <>
      <SimpleGrid minChildWidth={300} spacing={6} m="2rem">
        {cards}
      </SimpleGrid>
    <BookDetail isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default CardGrid