const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

let app = express();

let usuarios = require('./usuarios');
let campeones = require('./campeones');

let MongoClient = mongodb.MongoClient;
app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected!');
		app.locals.db = client.db('proyecto2');
	}
});

app.use('/usuarios', usuarios);
app.use('/campeones', campeones);
