/**
 * Created by root on 15-12-31.
 */
var io = require("socket.io")()

io.sockets.on("connect",function(socket){
    console.log("a user connected");
    io.sockets.emit("join","a user connected")
    socket.on("msg",function(msg){
        console.log(msg);
        socket.emit("msg",msg)
    })
});

module.exports = io