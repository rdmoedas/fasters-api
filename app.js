const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather');

const app = express();
const port = 3000;

app.use(cors());

app.use('/', weatherRoutes);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})