

const path = require('path');

const http = require('http');

const express = require('express');

const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 4000;

const publicDirectoryPath = path.join(__dirname, '/public');

const fs = require('fs');
const frd = require('formidable');
const filestore = require('fs-extra');




app.use(express.static(publicDirectoryPath));

io.on('connection', (client) => {

    console.log('New websocket connection');
    fs.readFile('./data/data.txt', function (err, data) {

        client.emit("data_load", data.toString());

    })


    client.on("data_save", (data) => {
       
        fs.writeFile('./data/data.txt', data, function (err) {
            if (err) throw err;
            console.log('Saved!');
            let fs = require('fs');

            fs.readFile('./data/data.txt', function (err, data) {

                client.emit("data_load", data.toString());
                

            })
        });

    })




    client.on('disconnect', () => {

        console.log('New websocket disconnected');

    });

})

server.listen(port, () => {

    console.log(`Server is up on port ${port}!`);

})