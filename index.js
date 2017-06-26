var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.get('/', function(req, res){
  res.render( 'pages/hello');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:5000');
});
