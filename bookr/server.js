const express = require('express')
const app = express()
const axios = require('axios');
const cors = require('cors')
const port = 5000
require('dotenv').config();

app.use(cors())

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
  console.log(`~~~~~~~************~~~~~~~~~~~~~~~~~~~~~***********~~~~~~~~~~~~~~~~~~`)
})

app.route('/to-read')
  .get((req, res) => {
    console.log("request params: ", req.query)
    const headers = {
      'Authorization': `Bearer ${req.query.token}`,
      'Content-Type': 'application/json',
    }
    axios.post(
      `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.query.shelfId}/addVolume?volumeId=${req.query.bookId}`,
      {},
      {headers: headers}
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error.response.data)
    })
    
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
