import React from "react";
import { Input, Heading, Box, Select } from "@chakra-ui/react";

const SearchBar = ({ handleSearchChange, q, selectSort }) => {
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
        placeholder="Star Trek"
        _placeholder={{ color: "inherit" }}
        size="lg"
        w={["60%", "50"]}
        minW="25%"
        m={2}
        value={q}
        onChange={handleSearchChange}
      />
      <Select
        placeholder="Sort"
        variant="filled"
        w={{ base: "10rem", md: "12rem" }}
        onChange={selectSort}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </Select>
    </Box>
  );
};

export default SearchBar;
