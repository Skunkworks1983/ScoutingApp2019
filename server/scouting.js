const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 1983;

const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'skunkscout',
	password : 'password', //TODO load from file
	database : 'matchdata'
});

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods','PUT');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.put('/', (req, res) => {
	console.log(req.body);
	//db.query("SELECT", function (error, results, fields) {
	//	if (error) throw error;
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Scouting server listening on port ${port}!`));
