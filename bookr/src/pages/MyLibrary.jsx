import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import SearchBar from '../components/SearchBar'
import ReadingNow from './ReadingNow'
import ToRead from './ToRead'
import HaveRead from './HaveRead'
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Container
 } from '@chakra-ui/react'
 import axios from 'axios'

const MyLibrary = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/get-token')
      .then((res)=> {
        console.log(res)
        setLoggedIn(true)
      })        
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Nav />
      <SearchBar title={"My Library"}/>
      <Container maxWidth="95%">
        <Tabs isFitted variant='enclosed-colored' colorScheme='blue' mt={3}>
          <TabList>
            <Tab>Reading Now</Tab>
            <Tab>To Read</Tab>
            <Tab>Have Read</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w="100%" h="auto">
              <ReadingNow loggedIn={loggedIn}/>
            </TabPanel>
            <TabPanel>
              <ToRead loggedIn={loggedIn}/>
            </TabPanel>
            <TabPanel>
              <HaveRead loggedIn={loggedIn}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  )
}

export default MyLibrary