import React from "react";
import { Input, Heading, Box } from "@chakra-ui/react";

const SearchBar = ({ handleSearchChange, q, title }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="xl" mb={4}>
        {title}
      </Heading>
      <Input
        color="gray.800"
        placeholder="title or author"
        _placeholder={{ color: "inherit" }}
        size="lg"
        w="40%"
        minW="25%"
        m={2}
        value={q}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchBar;
