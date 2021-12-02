const path = require('path');
const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

const api = require('./router');

const PORT = process.env.PORT || 3001;
const app = express();

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
