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

    // 'content' is the content of the designated file
    fs.readFile(`data/${queryData.id}`, 'utf-8', function (error, content) {
        fs.readdir('./data', function(error, filelist) {
            var list = '<ul>';
            var i = 0;

            for (i = 0; i < filelist.length; i++) {
                list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            }

            list += '</ul>';
        })

        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="index.html">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>Above is the current queryData for 'id'</p>
        ${content}
        </body>
        </html>
        `;
        response.end(template);
    });
});

server.listen(port);
console.log("Server instance running on Port " + port);