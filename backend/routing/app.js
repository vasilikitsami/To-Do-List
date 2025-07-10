var url = require('url');
var fs = require('fs');

function renderHTML(path, response){
    fs.readFile(path, null, function(error, data){
            if(error){
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write('File not found');
            } else{
                response.writeHead(200, {'Content-Type':'text/html'});
                response.write(data);
            }
            
            response.end();
    
        });
}

module.exports = {

    handleRequest: function(request, response){
        var path = url.parse(request.url).pathname;
        switch (path) {
            case '/': 
                renderHTML('./index.html', response);
                break;
            case '/login':
                renderHTML('./login.html', response);
                break;
            default:
                response.writeHead(404 , {'Content-Type': 'text/plain'});
                response.write('Route not defined');
                response.end();
        }
    }
}; 