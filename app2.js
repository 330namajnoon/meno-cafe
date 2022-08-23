//1.
var http = require('http');
var fs = require('fs');
var frd = require('formidable');
var filestore = require('fs-extra');
  
  
//2.
var server = http.createServer(function (req, resp) {
    //3.
    fs.readFile("public/index.html", function (error, pgResp) {
  
        if (error) {
            resp.writeHead(404);
            resp.write('Contents you are looking are Not Found');
        } else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write(pgResp);
        }
  
        resp.end();
    });
 
    //4.
    if (req.method.toLowerCase() == 'post') {
  
        //5.
  
        var fmr = new frd.IncomingForm();
        fmr.parse(req, function (err, fields, files) {
            resp.writeHead(200, { 'content-type': 'png/plain' });
  
        });
  
        fmr.on('end', function (fields, files) {
            //6.
            var tempPath = this.openedFiles[0].path;
  
            //7.
            var fileName = this.openedFiles[0].name;
  
            //8.       
            var newFileName = "./data" + fileName;
  
            //9.
            filestore.copy(tempPath, newFileName, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('File Uploaded');
                    resp.end('File Uploaded');
                }
            });
        });
  
        return;
    }
});
server.listen(5050);
console.log('Server Started.. on port 5050');