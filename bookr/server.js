const express = require('express')
const app = express()
const axios = require('axios');
const cors = require('cors')
const port = 5000
require('dotenv').config();

app.use(cors())

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

app.route('/to-read')
  .get((req, res) => {
    console.log("request params: ", req.url, req.query)
    res.send("adding a book to 'To Read'")
  })

app.route('/reading-now')
  .get((req, res) => {
    console.log("request params: ", req.url, req.query)
    res.send("adding a book to 'Reading Now'")
  })

app.route('/have-read')
  .get((req, res) => {
    console.log("request params: ", req.url, req.query)
    res.send("adding a book to 'Have Read'")
  })

// axios.post(
//   'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/addVolume',
//   {
//     volumeId: bookId,
//     key: process.env.REACT_APP_API_KEY
//   }
// ).then((response) => {
//   console.log(response);
// }).catch((error) => {
//   console.error(error)
// })