const express = require('express');
const route = express.Router();

route.use('/register', require('./register'))
route.use('/login', require('./login'));
route.use('/course', require('./course'));
// route.use('/temp', require('./testing'));
route.use('/logout', require('./logout'));
// route.use('/user', require('./user'));

module.exports = route;