const express = require('express');
const app = express();
const port = 1983;

app.get('/', (req, res) => res.send('Hello World!'));

// listen for the JSON object, and parse it into SQL queries
// app.post('SQL')

app.listen(port, () => console.log(`Example app listening on port ${port}!`));