const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {

  console.log('New user connected');

  socket.on('createMessage', (createMessage) => {
    //sent message to others
     socket.broadcast.emit('newMessage', {
      form : createMessage.form,
      text : createMessage.text,
      createdAt : new Date().getTime()
    });
  });


  //greet the user
    socket.emit('newMessage', {
      form : 'Admin',
      text : 'Welcome to chat room',
      createdAt : new Date().getTime()
    });


    /*
     //sent message to all
     io.emit('newMessage', {
      form : createMessage.form,
      text : createMessage.text,
      createdAt : new Date().getTime()
    });
    */

    //notifiy other about new message
     socket.broadcast.emit('newMessage', {
      form : "Admin",
      text : "User Added",
      createdAt : new Date().getTime()
    });



  socket.on('disconnect', function () {
    console.log('User was disconnected');
  });

});

server.listen(port,function () {
  console.log(`Server up at port ${port}`);
});
