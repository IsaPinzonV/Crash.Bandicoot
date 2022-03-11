const express = require('express');
const expressApp = express();
//Bring the socket.io module

const PORT = 5050;
const httpServer = expressApp.listen(PORT);
//Create a new instance of Socket.io Server
const { Server } = require('socket.io');
//Create a httpServer
const ioServer = new Server(httpServer);

const staticPlayer = express.static('public-player');
const staticDisplay = express.static('public-display');

expressApp.use('/player', staticPlayer);
expressApp.use('/display', staticDisplay);

/*
Set the ioServer to listen to new connections
Set the socket to listen to an event and the message from controller
Broadcast the message to the display
*/

ioServer.on('connection', (socket) => {
socket.on('directions', (clientPositions) => {
    console.log(clientPositions)
    socket.broadcast.emit('directions',clientPositions);
});

socket.on('display', (clientDisplay) => {
    console.log(clientDisplay)
    socket.broadcast.emit('display',clientDisplay);
});

socket.on('displayPlayer', (clientPlayer) => {
    console.log(clientPlayer)
    socket.broadcast.emit('displayPlayer',clientPlayer);
});
});
