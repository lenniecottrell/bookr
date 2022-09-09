import React, { useEffect, useState } from "react";
import { useToken } from "../hooks/useToken";
import axios from "axios";
import Nav from "../components/Nav";
import { Heading, Text, Container, Link } from "@chakra-ui/react";

const About = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token")
  );
  const { token, setToken } = useToken("");

  const getAccessToken = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/books",
      callback: handleAuthorizationResponse,
    });
    client.requestAccessToken();
  };

  //set the token from Google
  const handleAuthorizationResponse = (response) => {
    try {
      setToken(response.access_token);
      setLoggedIn(true);
      localStorage.setItem("token", response.access_token);
      console.log("got the token");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav
        getAccessToken={getAccessToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        w="100%"
      >
        <Heading size={{ base: "lg", md: "xl" }} mb={4}>
          About this app
        </Heading>
        <Text fontSize="xl" m={2}>
          Shelf is made with Vite (React), ChakraUI, and the Google Books API
        </Text>
        <Text fontSize="xl" m={2}>
          You can see it on Github{" "}
          <Link
            href="https://github.com/lenniecottrell/bookr"
            color="blue.500"
            textDecoration="underline"
          >
            here
          </Link>
        </Text>
        <Text fontSize="xl" m={2}>
          If you like it, or have feedback, or want to say hi, you can find me
          on{" "}
          <Link
            href="https://twitter.com/lenniecottrell"
            color="blue.500"
            textDecoration="underline"
          >
            Twitter
          </Link>
          or{" "}
          <Link
            href="https://www.linkedin.com/in/lenniecottrell/"
            color="blue.500"
            textDecoration="underline"
          >
            LinkedIn.
          </Link>
        </Text>
      </Container>
    </>
  );
};

export default About;
