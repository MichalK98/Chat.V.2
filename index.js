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

console.log("");
console.log("Listening to port ", + PORT);
console.log("Ctrl-C to stop");
console.log("");