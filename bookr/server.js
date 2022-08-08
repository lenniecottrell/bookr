const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const port = 5000;
require("dotenv").config();

app.use(cors());

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(
    `~~~~~~~************~~~~~~~~~~~~~~~~~~~~~***********~~~~~~~~~~~~~~~~~~`
  );
});

app.all("/set-token", (req, res, next) => {
  //clear token
  if (req.query.token === "") {
    app.set("token", "");
    res.send("token is removed from the server");
  }
  app.set("token", req.query.token);
  res.send("Token is set");
  next();
});

app.get("/get-token", (req, res) => {
  const token = app.get("token");
  res.send(token);
});

app.route("/add-to-shelf").get((req, res) => {
  console.log("request params: ", req.query);
  const headers = {
    Authorization: `Bearer ${app.get("token")}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/addVolume?volumeId=${req.query.bookId}`,
      {},
      { headers: headers }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  res.send("adding a book!");
});

app.route("/get-shelf").get((req, res) => {
  console.log("request params: ", req.query);
  const headers = {
    Authorization: `Bearer ${app.get("token")}`,
    "Content-Type": "application/json",
  };
  axios
    .get(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/volumes`,
      { headers: headers }
    )
    .then((response) => {
      for (let bookObj of response.data.items) {
        console.log(bookObj.volumeInfo.authors);
        // If there's more than one author, add a comma and a space to each item
        if (bookObj.volumeInfo.authors.length > 1) {
          for (let j = 0; j < bookObj.volumeInfo.authors.length - 1; j++) {
            bookObj.volumeInfo.authors[j] += ", ";
          }
        }
      }
      //console.log(response.data.items);
      res.send(response.data.items);
    })
    .catch((error) => {
      console.log(error.response.data);
      res.send(error.response.data);
    });
});

app.route("/remove-book").get((req, res) => {
  console.log("request params: ", req.query);
  const headers = {
    Authorization: `Bearer ${app.get("token")}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/removeVolume?volumeId=${req.query.bookId}`,
      {},
      { headers: headers }
    )
    .then((response) => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/volumes`,
          { headers: headers }
        )
        .then((response) => {
          //console.log(response.data.items);
          const responseObj = {
            bookResponse: response.data.items,
            shelfResponse: req.query.shelfId,
          };
          res.send(responseObj);
        });
      //res.send(response);
    })
    .catch((error) => {
      console.log(error.response.data);
      res.send(error.response.data);
    });
});
