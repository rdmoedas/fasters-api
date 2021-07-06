const express = require('express');
const router = express.Router();

const controller = require('../controller/weatherController');

router.get('/tempo/:id', controller.get)

module.exports = router;