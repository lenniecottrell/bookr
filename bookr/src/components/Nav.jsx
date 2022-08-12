import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleAuth";
// import GoogleButton from "react-google-button";
import {
  Flex,
  Spacer,
  Container,
  Link,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Nav = ({
  getAccessToken,
  loggedIn,
  setLoggedIn,
  token,
  setToken,
  location,
}) => {
  const toast = useToast();
  let navigate = useNavigate();

  const handleSignOut = () => {
    //clear token
    axios
      .get("http://localhost:5000/set-token", {
        params: {
          token: "",
        },
      })
      .then((response) => {
        console.log(response.data);
        setLoggedIn(false);
        setToken(false);
        toast({
          title: "You are now logged out",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        //reroute from MyLibrary
        if (location === "myLibrary") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex
      className="nav"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      m={5}
      px={5}
    >
      <Heading size={["xl", "2xl"]}>Bookr</Heading>
      <Spacer />
      <Container
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems={{ base: "flex-end", md: "center" }}
        justifyContent={{ base: "center", md: "flex-end" }}
        p={{ base: 0 }}
      >
        <Link as={RouterLink} to="/" mr={[0, 0, 5]} size={["md", "xl"]}>
          Search
        </Link>
        {!loggedIn ? (
          <Popover>
            <PopoverTrigger>
              <Link mx={[0, 0, 5]}> My Library </Link>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverBody>You need to sign in to view My Library</PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Link as={RouterLink} to="/library" mx={[0, 0, 5]}>
            My Library
          </Link>
        )}
        <Link as={RouterLink} to="/about" mx={[0, 0, 5]}>
          About
        </Link>
        {/* <Link as={RouterLink} to="/account" mx={5}>
          Account
        </Link> */}
        {token ? (
          <Button
            variant="outline"
            colorScheme="messenger"
            onClick={() => handleSignOut()}
          >
            Sign out
          </Button>
        ) : (
          <GoogleButton onClick={() => getAccessToken()} />
        )}
      </Container>
    </Flex>
  );
};

export default Nav;
