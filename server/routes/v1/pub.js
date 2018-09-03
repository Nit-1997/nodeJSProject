const express = require('express');
const server = express();

const router = express.Router();

const functions = require('functions'),
    controllers = require('controllers');

//const pubController = controllers.pub;


server.use('/', router);

module.exports = server;