var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var db = require('./models');

var app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static('public'));
app.use(morgan("default"));

nunjucks.configure('views', {noCache: true});

app.get('/', function(req, res) {
    res.render('index');
});


app.listen(1337, function(err) {
    if(err) console.log(err);
    console.log('started awesome server');
});

