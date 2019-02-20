const express = require('express');
const app = express();
const port = 1983;
const pg = require('pg');

// find this url when server is up
const conString = "";

app.get('/', (req, res) => res.send('Hello World!'));

// listen for the JSON object, and parse it into SQL queries
app.post('/', function()

);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));