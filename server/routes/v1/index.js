var express = require('express');
var server = express();

server.use('/order', require('./order'));
server.use('/user', require('./user'));

module.exports = server;