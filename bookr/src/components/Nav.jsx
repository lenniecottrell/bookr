import React from "react";
import { useToken } from "../hooks/useToken";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleAuth";
import PopoverWarning from "./PopoverWarning";
import {
  HStack,
  IconButton,
  Flex,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Link,
  Heading,
  Button,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Nav = ({ getAccessToken, loggedIn, setLoggedIn, location }) => {
  const toast = useToast();
  let navigate = useNavigate();
  const { onClose } = useDisclosure();
  const { token, setToken } = useToken();
  let tokenExists =
    window.localStorage.getItem("token") !== null ? true : false;

  const handleSignOut = () => {
    //clear token
    setLoggedIn(false);
    setToken("");
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    console.log("token exists?: ", tokenExists);
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
    onClose();
  };

  //reference here, but I had to make some significant adjustments for my use case: https://chakra-templates.dev/navigation/navbar

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
      <Heading size={{ base: "xl", md: "2xl" }}>Shelf</Heading>
      <Spacer />
      <HStack
        as={"nav"}
        display={{ base: "none", md: "flex" }}
        p={{ base: 0 }}
        spacing={6}
      >
        <Link as={RouterLink} to="/">
          Search
        </Link>
        {!loggedIn ? (
          <PopoverWarning isCollapsed={false} />
        ) : (
          <Link as={RouterLink} to="/library">
            My Library
          </Link>
        )}
        <Link as={RouterLink} to="/about">
          About
        </Link>
        {tokenExists ? (
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
      {/* collapsed menu */}
      <Flex display={{ md: "none" }}>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={IconButton}
                size={"lg"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
              />
              <MenuList>
                <LinkBox>
                  <MenuItem>
                    <LinkOverlay as={RouterLink} to="/">
                      Search
                    </LinkOverlay>
                  </MenuItem>
                </LinkBox>
                <LinkBox>
                  {!tokenExists ? (
                    <MenuItem closeOnSelect={false}>
                      <PopoverWarning isCollapsed={true} />
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <LinkOverlay as={RouterLink} to="/library">
                        My Library
                      </LinkOverlay>
                    </MenuItem>
                  )}
                </LinkBox>
                <LinkBox>
                  <MenuItem>
                    <LinkOverlay as={RouterLink} to="/about">
                      About
                    </LinkOverlay>
                  </MenuItem>
                </LinkBox>
                <LinkBox>
                  <MenuItem>
                    {tokenExists ? (
                      <LinkOverlay
                        as={Button}
                        variant="outline"
                        colorScheme="messenger"
                        onClick={() => handleSignOut()}
                      >
                        Sign out
                      </LinkOverlay>
                    ) : (
                      <LinkOverlay>
                        <GoogleButton onClick={() => getAccessToken()} />
                      </LinkOverlay>
                    )}
                  </MenuItem>
                </LinkBox>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Nav;
