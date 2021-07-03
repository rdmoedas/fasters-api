const express = require('express');
const router = express.Router();
const model = require('../models/weather');
const controller = require('../controller/weather');

router.get('/', controller.get)

module.exports = router;