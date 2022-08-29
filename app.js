require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const db = require('./models');

app.use(bodyParser.json());

db.sequelize.sync({ force: true })
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use('/api', routes);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
}).on('error', (err) => {
	console.log(err);
});

