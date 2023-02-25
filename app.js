var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var request = require('request');
var ejs = require('ejs');
var methodOverride = require('method-override');
var cors = require('cors');

app.use(bodyparser.json())
    .use(bodyparser.urlencoded({
        extended: true
    }));

//serve static assets
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.options('*', cors())
app.use(cors());
// app.use(function(req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// })


//define routes
const indexRoutes = require('./routes/index.js')

//use routes
app.use('/', indexRoutes);

//
var port = 4000;
app.listen(port, () => {
    console.log('listening on port ' + port)
})