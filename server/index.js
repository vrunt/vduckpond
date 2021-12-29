const path = require('path');
const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

const socketio = require('socket.io');
const http = require('http');

const api = require('./router');

const PORT = process.env.PORT || 3001;
const app = express();

const server = http.createServer(app);
const io = socketio(server, { cors: {
    origin: '*',
    methods: ['GET', 'POST']
} });

let numVisitors = 0;

io.on('connection', (socket) => {
    console.log(`new client connected`);
    numVisitors++;
    io.emit('visitors', `${numVisitors} at the pond`)
    socket.on('disconnect', () => {
        console.log(`client disconnected`);
        numVisitors--;
    io.emit('visitors', `${numVisitors} at the pond`)
    })
})

// const mongo = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//const collection = mongo.db('vduckpond').collection('ducks');

//serve React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//use router.js for API requests
app.use('/api', api);

//all other reqests return React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
