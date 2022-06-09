import React from 'react'
import Nav from '../components/Nav'
import { Heading, Text, Container, Link } from '@chakra-ui/react'

const About = () => {
  return (
    <>
      <Nav />
      <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
        <Heading size="xl" mb={4} >About this app</Heading>
        <Text m={2}>Do you like books?</Text>
        <Text m={2}>Do you like keeping track of your books?</Text>
        <Text m={2}>Do you like the idea of GoodReads but don't care at all about the social network part?</Text>
        <Text m={6}>Me too.</Text>
        <Text m={2}>Welcome to Bookr - a simple, straightforward way to keep track of your books</Text>
        <Text m={2}>This app is made with Vite(React), ChakraUI, and the Google Books API</Text>
        <Text m={2}>You can see it on Github <Link href="https://github.com/lenniecottrell/bookr" color="blue.500" textDecoration="underline">here</Link></Text>
        <Text m={2} >If you like it, or have feedback, or have nothing better to do, feel free to let me know on <Link href="https://twitter.com/lenniecottrell" color="blue.500" textDecoration="underline">Twitter</Link> </Text>
      </Container>
    </>
  )
}

export default About