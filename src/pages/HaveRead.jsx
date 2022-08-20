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
  // const [books, setBooks] = useState([])
  // const token = useToken().token
  //TODO
  //if the user isn't logged in, prompt them to log in with a CTA and a button

  // useEffect(()=>{

  //   axios.get(
  //     //google shelf ids (https://developers.google.com/books/docs/v1/using#ids):
  //     //To read = 2
  //     //Reading Now = 3
  //     //Have Read = 4
  //     'http://localhost:5000/get-shelf', {
  //       params: {
  //         shelfId: 4,
  //         token: token
  //       }
  //     })
  //     .then((response) => {
  //       //console.log(response)
  //       setBooks(response.data) //array of objects
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   }, [])

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
