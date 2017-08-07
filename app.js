var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models');
var routes = require('./routes');

var app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static('public'));
app.use(morgan("default"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


nunjucks.configure('views', {noCache: true});

app.use(routes);

models.db.sync({})
    .then(() => {
        app.listen(1337, function(err) {
            if(err) console.log(err);
            console.log('started awesome server');
        })
    })
    .then(() => {
    // insert query here
        //console.log(models.db);
        /*
         return models.User.create({
            name: 'Genji',
            email: 'shimada@overwatch.com'
        }).then((user) => {
             console.log(user.get('name'));
         })
         */
        //return models.User.save();

    })
    .catch(console.error);



