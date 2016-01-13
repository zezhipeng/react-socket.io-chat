var http = require('http');
var express = require('express');
var routes = require('./routes');
var users = require('./routes/users');
var path = require('path');
var socket = require("./udp.js");
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection
var mongoStore = require("connect-mongo")(session);

db.once("open",function(){
    console.log("db connected")
})

var sessionStore = new mongoStore({
    mongooseConnection: db,
    ttl: 7 * 24 * 60 * 60
});

var _session = session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8',
    store: sessionStore
});

var app = express();

// 适用开发和生产环境
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(_session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// 错误处理中间件应当在路由加载之后才能加载
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

var server = http.createServer(app);

socket.listen(server);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
