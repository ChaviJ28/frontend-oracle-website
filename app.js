var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var pug = require('pug');
var methodOverride = require('method-override');

app.use(bodyparser.json())
    .use(bodyparser.urlencoded({
        extended: true
    }));

//serve static assets
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'pug');

//define routes
const indexRoutes = require('./routes/index.js')

//use routes
app.use('/', indexRoutes);

//
var port = 4000;
app.listen(port, () => {
    console.log('listening on port ' + port)
})