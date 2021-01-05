var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = 8081;

app.get('/', function (req, res) {
    res.send('Hello /');
});

app.get('/world', function (req, res) {
    res.send('Hello World');
});

server.listen(port, function() {
    console.log("Server instance running on Port " + port);
});
