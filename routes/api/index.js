const express = require('express');
const route = express.Router();

route.use('/register', require('./register'))
route.use('/login', require('./login'));
route.use('/course', require('./course'));
route.use('/temp', require('./testing'));

module.exports = route;