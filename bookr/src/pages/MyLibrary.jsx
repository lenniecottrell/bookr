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
  Container
 } from '@chakra-ui/react'

const MyLibrary = () => {

  return (
    <div>
      <Nav />
      <SearchBar title={"My Library"}/>
      <Container>
        <Tabs isFitted mt={3}>
          <TabList>
            <Tab>Reading</Tab>
            <Tab>Want To Read</Tab>
            <Tab>Finished</Tab>
          </TabList>

          <TabPanels>
            <TabPanel w="100%" h="auto">
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