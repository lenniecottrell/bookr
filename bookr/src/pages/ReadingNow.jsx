import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import CardGridShelf from "../components/CardGridShelf";
import EmptyShelf from "../components/EmptyShelf";
import axios from "axios";
import { useToken } from "../hooks/useToken";

/*
 ***THIS COMPONENT CAN PROBABLY BE DELETED***
 */

const ReadingNow = ({ readingNowList }) => {
  return (
    <Box textAlign="center">
      {readingNowList.length === 0 ? (
        <EmptyShelf />
      ) : (
        <CardGridShelf books={readingNowList} />
      )}
    </Box>
  );
};

export default ReadingNow;
