import React from 'react'
import Nav from '../components/Nav'
import { Heading, Text, Container, Link } from '@chakra-ui/react'

const About = () => {
  return (
    <>
      <Nav />
      <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" w="100%" border='1px' borderColor='gray.600'>
        <Heading size="xl" mb={4} >About this app</Heading>
        <Text fontSize="xl" m={0}>Do you like books?</Text>
        <Text fontSize="xl" m={0}>Do you like keeping track of your books?</Text>
        <Text fontSize="xl" m={0}>Do you like the idea of GoodReads but don't care at all about the social network part?</Text>
      </Container>
      <Container  display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" mt="100"  border='1px' borderColor='gray.600'>
        <Text fontSize="xl" m={2}>Welcome to Bookr - a simple, straightforward way to keep track of your books</Text>
        <Text fontSize="xl" m={2}>This app is made with Vite (React), ChakraUI, and the Google Books API</Text>
        <Text fontSize="xl" m={2}>You can see it on Github <Link href="https://github.com/lenniecottrell/bookr" color="blue.500" textDecoration="underline">here</Link></Text>
        <Text fontSize="xl" m={2} >If you like it, or have feedback, or want to say hi, you can find me on <Link href="https://twitter.com/lenniecottrell" color="blue.500" textDecoration="underline">Twitter</Link> sometimes </Text>
      </Container>
    </>
  )
}

export default About