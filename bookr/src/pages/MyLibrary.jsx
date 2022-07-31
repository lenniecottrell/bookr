import React from 'react'
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

const MyLibrary = () => {

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
              <ReadingNow />
            </TabPanel>
            <TabPanel>
              <ToRead />
            </TabPanel>
            <TabPanel>
              <HaveRead />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  )
}

export default MyLibrary