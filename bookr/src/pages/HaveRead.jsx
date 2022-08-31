import React, { useState, useEffect } from "react";
import axios from "axios";
import CardGridShelf from "../components/CardGridShelf";
import EmptyShelf from "../components/EmptyShelf";
import { useToken } from "../hooks/useToken";
import { Box } from "@chakra-ui/react";

/*
 ***THIS COMPONENT CAN PROBABLY BE DELETED***
 */

const HaveRead = ({ haveReadList }) => {
  return (
    <Box textAlign="center">
      {haveReadList.length === 0 ? (
        <EmptyShelf />
      ) : (
        <CardGridShelf books={haveReadList} />
      )}
    </Box>
  );
};

export default HaveRead;
