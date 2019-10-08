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

// DB
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    database: 'chat',
    user: 'root',
    password: 'hYjx2f',
    namedPlaceholders: true
});

// Socket.io
const sockets = require('socket.io')(server,{pingInterval: 1000});

var count = 0;
sockets.on('connection', (socket) => {
    onConnect(socket);
    sockets.emit('onConnect')
    socket.on('disconnect', () => {
        onDisconnect(socket);
    });
    function onConnect(socket) {
        count++;
        sockets.emit("counter", {count:count});
    }
    function onDisconnect(socket) {
        count--;
        sockets.emit("counter", {count:count});
    }
});

sockets.on('connection', socket => {
    socket.on('message', (data) => {
        socket.emit('message', {id: data.id, message : data.message, username : 'You'});
        socket.broadcast.emit('message', {id: data.id, message : data.message, username : data.username});
    });
    connection.query(
        'SELECT * FROM `channels`',
        (err, res) => {
            res.forEach(channel => {
                socket.emit('channel', {id: channel.id, title : channel.title, description : channel.description});
            });
        }
    );
});

// --------------------- //
console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");
// --------------------- //