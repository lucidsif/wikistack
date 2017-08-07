const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');

router.get('/', function(req, res) {
    models.Page.findAll()
        .then(function(response){
            var pages = response.map((instance) => instance.dataValues);
            console.log(pages);
            return res.render('index', {pages: pages});
        })
        .catch(console.error)
});

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;