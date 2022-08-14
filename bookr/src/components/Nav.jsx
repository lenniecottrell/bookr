import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleAuth";
import PopoverWarning from "./PopoverWarning";
// import GoogleButton from "react-google-button";
import {
  Box,
  Stack,
  HStack,
  IconButton,
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
import { useToast, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <IconButton
        size={"lg"}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={"Open Menu"}
        display={{ md: "none" }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack
        display={{ base: "none", md: "flex" }}
        //flexDirection={{ base: "column", md: "row" }}
        //alignItems={{ base: "flex-end", md: "center" }}
        //justifyContent={{ base: "center", md: "flex-end" }}
        p={{ base: 0 }}
        spacing={6}
      >
        <Link as={RouterLink} to="/" size={["md", "xl"]}>
          Search
        </Link>
        {!loggedIn ? (
          <PopoverWarning />
        ) : (
          <Link as={RouterLink} to="/library">
            My Library
          </Link>
        )}
        <Link as={RouterLink} to="/about">
          About
        </Link>
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
      </HStack>
    </Flex>
  );
};

export default Nav;
