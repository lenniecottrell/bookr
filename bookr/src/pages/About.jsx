import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Heading, Text, Container, Link } from "@chakra-ui/react";
import axios from "axios";
import { useToken } from "../hooks/useToken";

const About = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { token, setToken } = useToken("");
  //get the token from the server if it exists
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-token")
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Nav loggedIn={loggedIn} token={token} />
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        w="100%"
      >
        <Heading size="xl" mb={4}>
          About this app
        </Heading>
        <Text fontSize="xl" m={2}>
          This app is made with Vite (React), ChakraUI, and the Google Books API
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
          </Link>{" "}
          sometimes.{" "}
        </Text>
      </Container>
    </>
  );
};

export default About;
