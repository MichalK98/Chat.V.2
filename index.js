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

// Set the time zone on connection
connection.on("connection", () => {
    connection.query("SET time_zone = '+02:00'");
});

// Socket.io
const sockets = require('socket.io')(server,{pingInterval: 1000});

var count = 0;
let locale;
sockets.on("connection", (socket) => {
    onConnect(socket);
    sockets.emit("onConnect")
    socket.on("disconnect", () => {
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
    return newTime;
}

sockets.on("connection", socket => {
    // On send msg
    socket.on("message", (data) => {
        console.log('Sending');
        connection.query(`
        INSERT
        INTO messages
        (
            channel_id,
            username,
            message
            )
            VALUES
            (
                1,
                ?,
                ?
                );
                `, [data.username, data.message], () => {
                connection.query(`
                    SELECT *
                    FROM
                    (
                        SELECT *
                        FROM messages
                        ORDER BY id
                        DESC
                        LIMIT 1
                    ) messages
                    ORDER BY messages.id;
                    `, (err, res) => {
                        let messages = res.map(message => {
                            return {
                                id: message.id,
                                message: message.message,
                                username: message.username,
                                date: localeTime(message.date)
                            };
                        });
                        socket.emit("newMessages", messages);
                        socket.broadcast.emit("newMessages", messages);
                    }
                );
            }
        );
    });

    // Get all channels
    connection.query(`
        SELECT *
        FROM channels;
        `, (err, res) => {
            let channels = res.map(channel => {
                return {
                    id: channel.id,
                    title: channel.title,
                    description: channel.description,
                    icon: channel.icon
                };
            });
            socket.emit("channels", channels);
        }
    );

    // Get last 'n' messages from channel_id = ?
    socket.on("channel", (data) => {
        // Query to Get last 'n' messages from channel_id = ?
        connection.query(`
            SELECT *
            FROM (
                SELECT *
                FROM messages
                WHERE channel_id = ?
                ORDER BY id
                DESC
                LIMIT 10
            ) messages
            ORDER BY messages.id;
            `, [data.channel_id], (err, res)  =>  {
                // Clear the chat room
                socket.emit("clear");
                // Create a new messages array
                let messages = res.map(message => {
                    return {
                        id: message.id,
                        message : message.message,
                        username : message.username,
                        date: localeTime(message.date)
                    };
                });
                // Display the new message array
                socket.emit("messages", messages);
            }
        );
    });
});

// --------------------- //
console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");
// --------------------- //