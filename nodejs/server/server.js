
const express = require('express');
;
// const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

 
const Port = process.env.PORT || 8000 ;

const router = require('./router');

const app = express();


const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});






io.on('connection', (socket) => {
console.log("we have a new connection!!!!");
socket.on('join', ({name,room},callback) => {
  console.log(name,room);

});

  socket.on('disconnect', () => {
    console.log("User has left!!");
  });


});
app.use(router);

server.listen("8000", () => console.log(`Server has started on port 8000 `));