var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    form : 'Priya Amir',
    text : "createMessage!!!"
  });
});

socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log('newMessage from server'+ JSON.stringify(newMessage) );
});
