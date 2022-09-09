import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Link,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

const PopoverWarning = ({ isCollapsed }) => {
  return (
    <Popover>
      <PopoverTrigger>
        {isCollapsed ? (
          <LinkOverlay fontSize="md">My Library</LinkOverlay>
        ) : (
          <Text fontSize="md">My Library </Text>
        )}
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton />
        <PopoverBody fontSize="md">
          You need to sign in to view My Library
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWarning;
