import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Link,
} from "@chakra-ui/react";

const PopoverWarning = () => {
  return (
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
  );
};

export default PopoverWarning;
