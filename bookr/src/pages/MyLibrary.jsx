import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Nav from "../components/Nav";
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
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const MyLibrary = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useToken("");
  const [toReadList, setToReadList] = useState([]);
  const [readingNowList, setReadingNowList] = useState([]);
  const [haveReadList, setHaveReadList] = useState([]);
  //TODO: add route to the URL to preserve the active tab on refresh
  //https://reactrouter.com/docs/en/v6/hooks/use-navigate
  //https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript?test=true
  const [activeTab, setActiveTab] = useState(1);

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
            token: token,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setToReadList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      //get Reading Now shelf
      axios
        .get("http://localhost:5000/get-shelf", {
          params: {
            shelfId: 3,
            token: token,
          },
        })
        .then((response) => {
          //console.log(response.data);
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
            token: token,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setHaveReadList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Nav
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        location={"myLibrary"}
      />
      <Heading
        size="xl"
        mb={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        My Library
      </Heading>
      <Container maxWidth="95%">
        <Tabs
          isFitted
          isLazy
          variant="enclosed-colored"
          colorScheme="blue"
          mt={3}
          onChange={(index) => {
            setActiveTab(index);
          }}
        >
          <TabList>
            <Tab>To Read</Tab>
            <Tab>Reading Now</Tab>
            <Tab>Have Read</Tab>
          </TabList>
          {loading ? (
            <Container centerContent>
              <Spinner mt={10} size="xl" />
            </Container>
          ) : (
            <TabPanels>
              <TabPanel textAlign="center">
                {toReadList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf
                    books={toReadList}
                    shelfId={2}
                    setToReadList={setToReadList}
                  />
                )}
              </TabPanel>
              <TabPanel w="100%" h="auto" textAlign="center">
                {readingNowList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf
                    books={readingNowList}
                    shelfId={3}
                    setReadingNowList={setReadingNowList}
                  />
                )}
              </TabPanel>
              <TabPanel textAlign="center">
                {haveReadList.length === 0 ? (
                  <EmptyShelf />
                ) : (
                  <CardGridShelf
                    books={haveReadList}
                    shelfId={4}
                    setHaveReadList={setHaveReadList}
                  />
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
