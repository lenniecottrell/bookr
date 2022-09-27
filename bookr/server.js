const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
console.log("port:", process.env.PORT);
app.use(cors());

//serves the frontend files from the dist folder after build
app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(
    `~~~~~~~************~~~~~~~~~~~~~~~~~~~~~***********~~~~~~~~~~~~~~~~~~`
  );
});

app.route("/add-to-shelf").get((req, res) => {
  const headers = {
    Authorization: `Bearer ${req.query.token}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/addVolume?volumeId=${req.query.bookId}`,
      {},
      { headers: headers }
    )
    .then(() => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/volumes`,
          { headers: headers }
        )
        .then((response) => {
          //console.log(response.data.items);
          if (response.data.items === undefined) {
            res.send([]);
          } else if (response.data.items.length > 0) {
            for (let bookObj of response.data.items) {
              // If there's more than one author, add a comma and a space to each item
              //console.log(bookObj.volumeInfo.authors);
              if (bookObj.volumeInfo.authors === undefined) {
                bookObj.volumeInfo.authors = [];
              }
              if (bookObj.volumeInfo.authors.length > 1) {
                for (
                  let j = 0;
                  j < bookObj.volumeInfo.authors.length - 1;
                  j++
                ) {
                  bookObj.volumeInfo.authors[j] += ", ";
                }
              }
            }
          }
          let responseObj = {
            bookResponse: response.data.items,
            shelfResponse: req.query.shelfId,
          };
          res.send(responseObj);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error.response);
      res.send(error.response.data);
    });
});

app.route("/get-shelf").get((req, res) => {
  const headers = {
    Authorization: `Bearer ${req.query.token}`,
    "Content-Type": "application/json",
  };
  axios
    .get(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/volumes`,
      { headers: headers }
    )
    .then((response) => {
      //if no books exist already, send an empty array
      if (response.data.items === undefined) {
        res.send([]);
      } else {
        for (let bookObj of response.data.items) {
          //if no authors are listed
          //TODO: refactor this with hasOwnProperty()
          if (bookObj.volumeInfo.authors === undefined) {
            bookObj.volumeInfo.authors = [];
          }
          // If there's more than one author, add a comma and a space to each item
          if (bookObj.volumeInfo.authors.length > 1) {
            for (let j = 0; j < bookObj.volumeInfo.authors.length - 1; j++) {
              bookObj.volumeInfo.authors[j] += ", ";
            }
          }
        }
        res.send(response.data.items);
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.route("/remove-book").get((req, res) => {
  const headers = {
    Authorization: `Bearer ${req.query.token}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/removeVolume?volumeId=${req.query.bookId}`,
      {},
      { headers: headers }
    )
    .then(() => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/volumes`,
          { headers: headers }
        )
        .then((response) => {
          if (response.data.items > 0) {
            for (let bookObj of response.data.items) {
              // If there's more than one author, add a comma and a space to each item
              if (bookObj.volumeInfo.authors.length > 1) {
                for (
                  let j = 0;
                  j < bookObj.volumeInfo.authors.length - 1;
                  j++
                ) {
                  bookObj.volumeInfo.authors[j] += ", ";
                }
              }
            }
          }
          const responseObj = {
            bookResponse: response.data.items,
            shelfResponse: req.query.shelfId,
          };
          res.send(responseObj);
        });
    })
    .catch((error) => {
      console.log(error.response.data);
      res.send(error.response.data);
    });
});

//this is a route that is triggered for every request
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
