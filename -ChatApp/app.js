const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);




app.use('/public', express.static('public'));



app.set('view engine', 'ejs');


//creating connection
io.on('connection', socket => {
    console.log("connection established ")

    //if connection is disconnected
    socket.on('disconnect',()=>{
        console.log("connection disconnected")
    })

   //Event listner 
    socket.on('message',msg=>{
        //broadcasting massage to all connected clients 
        //with event name "server"
        socket.broadcast.emit('server',msg);
    })
    
    //sending msg to client
    // socket.emit("server"," hello client how are you")
})


app.get("/", (req, res) => {
    res.render('chat');
})

http.listen(80, () => {
    console.log("listening on localhost")
})