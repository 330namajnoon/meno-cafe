

const path = require('path');

const http = require('http');

const express = require('express');

const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 4000;

const publicDirectoryPath = path.join(__dirname, '/public');
//////  save data
const fs = require('fs');
const frd = require('formidable');
const filestore = require('fs-extra');
/////  save image
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req ,file,cd) => {
        cd(null,'images');
    },
    filename: (req,file,cd) => {
        console.log(file.filename);
        cd(null,Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({storage: storage});

app.post('/upload',upload.single('image'),(req,res) => {
    res.send('image uploaded');
})


app.use(express.static(publicDirectoryPath));

io.on('connection', (client) => {

    console.log('New websocket connection');
    
    client.on("data_load",(database,data)=> {
        fs.readFile("./data/"+database+".txt", function (err, data) {
            client.emit("data_load",database,data.toString());
        })
        
    })
    client.on("data_save", (database,data) => {
       
        fs.writeFile("./data/"+database+".txt", data, function (err) {
            if (err) throw err;
            console.log('Saved!');
            let fs = require('fs');

            fs.readFile("./data/"+database+".txt", function (err, data) {

                client.emit("data_load",database,data.toString());
                

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