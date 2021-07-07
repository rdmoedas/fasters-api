const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weatherRoutes');

const app = express();


app.use(express.json());

app.use(cors());

app.use('/', weatherRoutes);

module.exports = app;