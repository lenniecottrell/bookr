const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
  console.log(
    `~~~~~~~************~~~~~~~~~~~~~~~~~~~~~***********~~~~~~~~~~~~~~~~~~`
  );
});

// app.all("/set-token", (req, res, next) => {
//   //clear token
//   if (req.query.token === "") {
//     app.set("token", "");
//     res.send("token is removed from the server");
//   } else {
//     app.set("token", req.query.token);
//     res.send("Token is set");
//   }
//   next();
// });

// app.get("/get-token", (req, res) => {
//   const token = req.query.token;
//   res.send(token);
// });

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
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  res.send("adding a book!");
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
    .then((response) => {
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

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
