const express 		= require('express');
const app 			= express();

app.get('/', (req, res) => {
	console.log('Hello World');
	res.send('Hello World!');
});

app.get('/get', (req, res) => {
	console.log('Get World');
	res.send('Get World');
});
module.exports = app;