const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// http.listen( 8080, function(){
//   console.log('listening on *:8080');
// });

http.listen(PORT, () => {
  console.log(`now listening on ${PORT}`)
})