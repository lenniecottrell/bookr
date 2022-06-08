import React from 'react'
import Nav from '../components/Nav'
import { Heading, Text, Container, Link } from '@chakra-ui/react'

const About = () => {
  return (
    <>
      <Nav />
      <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
        <Heading m={4}>About this app</Heading>
        <Text>Do you like books?</Text>
        <Text>Do you like keeping track of your books?</Text>
        <Text>Do you like the idea of GoodReads but don't care at all about the social network part?</Text>
        <Text>Me too</Text>
        <Text>Welcome to Bookr - a simple, straightforward way to keep track of your books</Text>
        <Text>This app is made with Vite(React), ChakraUI, and the Google Books API</Text>
        <Text>You can see it on Github <Link href="https://github.com/lenniecottrell/bookr">here</Link></Text>
        <Text>If you like it, or have feedback, or have nothing better to do, feel free to let me know on <Link href="https://twitter.com/lenniecottrell">Twitter</Link> </Text>
      </Container>
    </>
  )
}

export default About