import React, { useState, useEffect } from "react";
import axios from "axios";
import CardGridShelf from "../components/CardGridShelf";
import EmptyShelf from "../components/EmptyShelf";
import NotLoggedIn from "../components/NotLoggedIn";
import { useToken } from "../hooks/useToken";
import { Box } from "@chakra-ui/react";

/*
 ***THIS COMPONENT CAN PROBABLY BE DELETED***
 */

const ToRead = ({ toReadList }) => {
  return (
    <Box textAlign="center">
      {toReadList.length === 0 ? (
        <EmptyShelf />
      ) : (
        <CardGridShelf books={toReadList} />
      )}
    </Box>
  );
};

export default ToRead;
