import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import ReadingNow from "./ReadingNow";
import ToRead from "./ToRead";
import HaveRead from "./HaveRead";
import CardGridShelf from "../components/CardGridShelf";
import EmptyShelf from "../components/EmptyShelf";
import { useToken } from "../hooks/useToken";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const MyLibrary = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useToken("");
  const [toReadList, setToReadList] = useState([]);
  const [readingNowList, setReadingNowList] = useState([]);
  const [haveReadList, setHaveReadList] = useState([]);

  useEffect(() => {
    setLoggedIn(false);
    setTimeout(() => {
      axios
        .get("http://localhost:5000/get-token")
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
          setToken(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      //google shelf ids:
      //To read = 2
      //Reading Now = 3
      //Have Read = 4

      //get To Read shelf
      axios
        .get("http://localhost:5000/get-shelf", {
          params: {
            shelfId: 2,
          },
        })
        .then((response) => {
          // console.log(response)
          setToReadList(response.data); //array of objects
        })
        .catch((error) => {
          console.log(error);
        });

      //get Reading Now shelf
      axios
        .get("http://localhost:5000/get-shelf", {
          params: {
            shelfId: 3,
          },
        })
        .then((response) => {
          console.log(response.data);
          setReadingNowList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      //get Have Read shelf
      axios
        .get("http://localhost:5000/get-shelf", {
          params: {
            shelfId: 4,
          },
        })
        .then((response) => {
          console.log(response);
          setHaveReadList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 2000);
    //pass book data into the components...
  }, []);

  return (
    <div>
      <Nav />
      <SearchBar title={"My Library"} />
      <Container maxWidth="95%">
        <Tabs isFitted variant="enclosed-colored" colorScheme="blue" mt={3}>
          <TabList>
            <Tab>Reading Now</Tab>
            <Tab>To Read</Tab>
            <Tab>Have Read</Tab>
          </TabList>
          {loading ? (
            <Container centerContent>
              <Spinner />
            </Container>
          ) : (
            <TabPanels>
              <TabPanel w="100%" h="auto" textAlign="center">
                {readingNowList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf books={readingNowList} shelfId={3} />
                )}
              </TabPanel>
              <TabPanel textAlign="center">
                {toReadList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf books={toReadList} shelfId={2} />
                )}
              </TabPanel>
              <TabPanel textAlign="center">
                {haveReadList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf books={haveReadList} shelfId={4} />
                )}
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Container>
    </div>
  );
};

export default MyLibrary;
