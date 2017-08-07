var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', function(req, res) {
    res.redirect('/');
});

wikiRouter.get('/add', function(req, res) {
    res.render('addpage');
});

wikiRouter.post('/', function(req, res) {
    var data = req.body;
    console.log(data);
    var pageStatus = data['page-status'];

    var page = Page.build({
        title: data.title,
        content: data.content,
        status: pageStatus
    });

    page.save()
        .then((response) => {
        //console.log(response);
        res.redirect('/');
    })
        .catch(console.error)
});

module.exports = wikiRouter;