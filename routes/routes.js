const express 		= require('express');
const app 			= express();
const vehicle = require('../controllers/vehicleController')
app.post('/register_vehicle', async(req, res) => {
	await vehicle.create(req, res);
});

app.get('/get', (req, res) => {
	console.log('Get World');
	res.send('Get World');
});
module.exports = app;