const express = require('express');
const mysql = require('mysql2');
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

// Create connection to database
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
let locale;

// Change the time depended on the local time zone
localeTime = (dbTime) => {
    newTime = format(new Date(dbTime), "HH:mm", locale);
    return newTime;
}

sockets.on("connection", socket => {
    // Get the local time zone
    connection.query("SET time_zone = '+02:00'");
    // Start the Connect function
    onConnect(socket);
    // On Disconnect
    socket.on("disconnect", () => {
        // Start the Disconnect function
        onDisconnect(socket);
    });

    // Connect function
    function onConnect(socket) {
        count++;
        sockets.emit("counter", {count:count});
        // Get local time
        locale = Intl.DateTimeFormat().resolvedOptions().locale;
    };

    // Disconnect function
    function onDisconnect(socket) {
        count--;
        sockets.emit("counter", {count:count});
    };








    // Join
    socket.on('join', (data) => {
        socket.join(data.channel_title);
        console.log("Joined channel: ", data.channel_title);
    });









    // Get the sended message
    socket.on("message", (data) => {
        console.log(data);
        // Query to Send the message
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
                ?,
                ?,
                ?
            );
        `, [data.channel.id, data.username, data.message], () => {
            // Query to Get the Sended message
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
                // Create a new messages array
                let messages = res.map(message => {
                    return {
                        id: message.id,
                        message: message.message,
                        username: message.username,
                        date: localeTime(message.date)
                    };
                });

                // Display the new messages array
                socket.emit("newMessages", messages);
                // NEW
                socket.broadcast.to(data.channel.title).emit("newMessages", messages);
                console.log("Send to: ", data.channel.title);
            });
        });
    });

    // Get all channels
    // Query to Get all channels
    connection.query(`
        SELECT *
        FROM channels;
    `, (err, res) => {
        // Create a new channels array
        let channels = res.map(channel => {
            return {
                id: channel.id,
                title: channel.title,
                description: channel.description,
                icon: channel.icon
            };
        });
        // Display the new channels array
        socket.emit("channels", channels);
    });

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
        `, [data.channel.id], (err, res)  =>  {
            // Clear the chat room
            socket.emit("clear");
            // Create a new messages array
            let messages = res.map(message => {
                return {
                    channel_id: data.channel_id,
                    id: message.id,
                    message : message.message,
                    username : message.username,
                    date: localeTime(message.date)
                };
            });
            // Display the new messages array
            socket.emit("messages", messages);
            socket.emit("channelActive", data.channel);
        });
    });
});

// --------------------- //
console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");
// --------------------- //