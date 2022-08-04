import React from "react";
import { Link as RouterLink } from "react-router-dom";
import GoogleButton from "react-google-button";
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
  Text,
  Button,
} from "@chakra-ui/react";

const Nav = ({ getAccessToken, loggedIn, token }) => {
  const handleSignOut = () => {
    alert("Workin' on it!");
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
      <Heading size="2xl">Bookr</Heading>
      <Spacer />
      <Container
        maxW="md"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Link as={RouterLink} to="/" mr={5}>
          Search
        </Link>
        {!loggedIn ? (
          <Popover>
            <PopoverTrigger>
              <Link mx={5}> My Library </Link>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverArrow bg="blue.800" />
              <PopoverCloseButton />
              <PopoverBody>You need to sign in to view My Library</PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Link as={RouterLink} to="/library" mx={5}>
            My Library
          </Link>
        )}
        <Link as={RouterLink} to="/about" mx={5}>
          About
        </Link>
        {/* <Link as={RouterLink} to="/account" mx={5}>
          Account
        </Link> */}
      </Container>
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
      {/* Come back to this
      <GoogleAuth onClick={() => getAccessToken()} /> */}
    </Flex>
  );
};

export default Nav;
