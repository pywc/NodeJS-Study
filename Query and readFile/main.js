var http = require("http");
var fs = require('fs');
var url = require('url');
var port = 8081;

var server = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    // blah[.]com?id=blah
    var title = queryData.id;

    if (_url == '/') {
        _url = '/index.html';
    }

    if (url == '/favicon.ico') {
        return response.writeHead(404);
    }

    response.writeHead(200);

    fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>Above is the current queryData for 'id'</p>
        ${description}
        </body>
        </html>
        `;
        response.end(template);
    });
});

server.listen(port);
console.log("Server instance running on Port " + port);