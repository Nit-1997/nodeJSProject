const express = require('express');
const server = express();

const router = express.Router();

const functions = require('functions'),
    controllers = require('controllers');

const pubController = controllers.pubs;

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})


router.route('/create')
  .post(upload.single('image'),pubController.create);



server.use('/', router);

module.exports = server;