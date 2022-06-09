import React from 'react'
import Nav from '../components/Nav'
import SearchBar from '../components/SearchBar'
import Reading from './Reading'
import WantToRead from './WantToRead'
import Finished from './Finished'
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Heading,
  Text,
  Container
 } from '@chakra-ui/react'

const MyLibrary = () => {

  const libraryHeading="My Library"
  return (
    <div>
      <Nav />
      <SearchBar heading={libraryHeading}/>
      <Container>
        <Tabs isFitted>
          <TabList>
            <Tab>Reading</Tab>
            <Tab>Want To Read</Tab>
            <Tab>Finished</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Reading />
            </TabPanel>
            <TabPanel>
              <WantToRead />
            </TabPanel>
            <TabPanel>
              <Finished />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  )
}

export default MyLibrary