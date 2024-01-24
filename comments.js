// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    // 2.1 get url
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);
    // 2.2 handle error
    if(resource == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    // 2.3 respond to the browser
    response.writeHead(200,{'Content-Type':'text/html'});
    // 2.4 read file from web server
    if(resource == '/'){
        resource = '/index.html';
    }
    var resourcePath = '.' + resource;
    console.log('resourcePath='+resourcePath);
    fs.readFile(resourcePath,'utf-8',function(error,data){
        if(error){
            response.writeHead(500);
            response.end('Server Error!');
            return;
        }
        response.end(data);
    });
});
// 3. start server
server.listen(8080,function(){
    console.log('Server running at http://localhost:8080');
});