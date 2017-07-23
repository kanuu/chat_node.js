const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//接続時に振られた一意のIDをコンソールに表示
	console.log('%s さんが接続しました。', socket.id);

	//デフォルトのチャンネル
  var channel = 'channel-a';

  //接続時に自分以外の全員にIDを表示
  socket.broadcast.emit('chat message', socket.id + 'さんが入室しました！', 'system');

  //Roomを初期化
  socket.join(channel);

  //messageイベントで動く
  //同じチャンネルの人にメッセージを送る
  socket.on('message', function(msj) {
    io.sockets.in(channel).emit('message', msg, socket.id);
  });


  socket.on('chat message', function(msg){
  	io.sockets.in(channel).emit('chat message', msg, socket.id);
    // io.emit('chat message', msg);
  });

  socket.on('disconnect', function(e) {
    console.log('%s さんが退室しました。', socket.id);
  });

});

http.listen(PORT, () => {
  console.log(`now listening on ${PORT}`)
})