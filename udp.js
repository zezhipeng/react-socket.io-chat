/**
 * Created by root on 15-12-31.
 */
var io = require("socket.io")()
var ios = require('socket.io-express-session');
var session = require('express-session');
var mongoose = require("mongoose");
var mongoStore = require("connect-mongo")(session);
var db = mongoose.connection;

var store = new mongoStore({
    mongooseConnection: db,
    ttl: 7 * 24 * 60 * 60
});
var _session = session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8',
    store: store
});

io.use(ios(_session));

io.sockets.on("connect",function(socket){

    console.log("a user connected");

    socket.on("init",function(){
        socket.room = socket.handshake.session.room;
        socket.join(socket.room);
        io.sockets.in(socket.room).emit("system","系统提示:"+socket.handshake.session.user.name+"加入频道")
    });

    socket.on("msg",function(msg){
        console.log(msg);
        msg.user= socket.handshake.session.user
        io.sockets.in(socket.room).emit("msg",msg)
    });
});

module.exports = io;