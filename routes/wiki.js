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

wikiRouter.get('/:page', function(req, res) {
    var pageName = req.params.page;
    // query db where urlTitle = pageName
    Page.findOne({
        where: {
            urlTitle: pageName
        }
    })
        .then((response) => {
        var data = response.dataValues;
        console.log(data);
        res.render('wikipage', data);
        })
        .catch(console.error);
});


wikiRouter.post('/', function(req, res, next) {
    var data = req.body;
    console.log(data);
    var pageStatus = data['page-status'];

    // if there is not an existing email in the db, create user
     User.findOne({
        where : {
            email: data.email
        }
     }).then((response) => {
         console.log('results of user.findOne');
         var user = response
         // if user exists
         console.log(user.dataValues);
         if (user.dataValues.hasOwnProperty('name')) {
             console.log('existing user');
             return user;
         } else { // if user does not exist, create the user
             console.log('new user');
             return User.create({
                 name: data['author-name'],
                 email: data.email,
             })
         }
     }).then((response) => {
         var user = response;
         return Page.create({
             title: data.title,
             content: data.content,
             status: pageStatus,
             authorId: user.id
         });
     }).then((response) => {
         console.log('post was created');
         res.redirect('/');
         })
         .catch(console.err);
});

// define an error handler route

module.exports = wikiRouter;