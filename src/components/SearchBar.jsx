import React from "react";
import { Input, Heading, Box } from "@chakra-ui/react";

const SearchBar = ({ handleSearchChange, q }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="xl" mb={4}>
        Find A Book
      </Heading>
      <Input
        color="gray.800"
        placeholder="Search"
        _placeholder={{ color: "inherit" }}
        size="lg"
        w={["60%", "50"]}
        minW="25%"
        m={2}
        value={q}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchBar;
