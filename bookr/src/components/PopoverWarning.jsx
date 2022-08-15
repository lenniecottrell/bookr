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
} from "@chakra-ui/react";

const PopoverWarning = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <LinkOverlay> My Library </LinkOverlay>
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg="blue.800"
        borderColor="blue.800"
        textAlign="center"
      >
        <PopoverArrow bg="blue.800" />
        {/* <PopoverCloseButton /> */}
        <PopoverBody>You need to sign in to view My Library</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWarning;
