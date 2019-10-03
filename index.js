const express = require('express');
const compression = require('compression');

let PORT = 9009;
let app = express();

app.use(compression());
app.use("/dist", express.static("dist"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('index');
});

server = app.listen(PORT);

// Socket.io
const sockets = require('socket.io')(server,{pingInterval: 1000});

var count = 0;
sockets.on('connection', function (socket) {
    count++;
    socket.emit('counter', {count:count});

    /* Disconnect socket */
    socket.on('disconnect', function() {
        count--;
        socket.emit('counter', {count:count});
        console.log('d',count);
    });
    console.log('c', count);
});

sockets.on('connection', socket => {
    socket.on('message', (data) => {
        socket.emit('message', {id: data.id, message : data.message, username : 'You'});
        socket.broadcast.emit('message', {id: data.id, message : data.message, username : data.username});
    });
});


// --------------------- //
console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");
// --------------------- //