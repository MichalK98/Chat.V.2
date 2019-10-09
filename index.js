const express = require('express');
const compression = require('compression');
const { format } = require('date-fns');

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

connection.on("connection", () => {
    connection.query("SET time_zone = '+02:00'");
});

// Socket.io
const sockets = require('socket.io')(server,{pingInterval: 1000});

var count = 0;
let locale;
sockets.on('connection', (socket) => {
    onConnect(socket);
    sockets.emit('onConnect')
    socket.on('disconnect', () => {
        onDisconnect(socket);
    });
    function onConnect(socket) {
        count++;
        sockets.emit("counter", {count:count});

        // Get local time
        locale = Intl.DateTimeFormat().resolvedOptions().locale;
    }
    function onDisconnect(socket) {
        count--;
        sockets.emit("counter", {count:count});
    }
});

localeTime = (dbTime) => {
    newTime = format(new Date(dbTime), "HH:mm", locale);
    // console.log("dbTime: ", dbTime);
    // console.log("locale: ", locale);
    // console.log("newTime: ", newTime);

    return newTime;
}

sockets.on('connection', socket => {
    // On send msg
    socket.on('message', (data) => {
        connection.query(`
        INSERT INTO messages (channel_id, username, message) VALUES ( '1', ?, ?);
            `, [data.username, data.message], () => {
                connection.query(`
                SELECT * FROM ( 
                    SELECT * FROM messages ORDER BY id DESC LIMIT 1
                    ) messages ORDER BY messages.id
                    `, (err, res) => {
                        res.forEach(message => {
                            socket.emit('message', {id: message.id, message : message.message, username : 'You', date: localeTime(message.date)});
                            socket.broadcast.emit('message', {id: message.id, message : message.message, username : message.username, date: localeTime(message.date)});
                        });
                    }
                );
            }
        );
    });
    // Get all channels
    connection.query(`
    SELECT * FROM channels;
        `, (err, res) => {
            res.forEach(channel => {
                socket.emit('channel', {id: channel.id, title : channel.title, description : channel.description, icon : channel.icon});
            });
        }
    );
    // Get last 10 messages
    connection.query(`
    SELECT * FROM ( 
        SELECT * FROM messages WHERE channel_id = 1 ORDER BY id DESC LIMIT 10
    ) messages ORDER BY messages.id
        `, (err, res) => {
            res.forEach(message => {
                socket.emit('message', {id: message.id, message : message.message, username : message.username, date: localeTime(message.date)});
                // console.log(res);
            });
        }
    );









    connection.query(`
    SELECT * FROM messages
        `, (err, res) => {
            console.log(res);
        }
    );










});

// --------------------- //
console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");
// --------------------- //