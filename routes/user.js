var express = require('express');
var userRouter = express.Router();



userRouter.get('/', function(req, res) {
    res.send('hello user');
});

module.exports = userRouter;