const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
require('dotenv').config();

app.use(cors())
app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})
