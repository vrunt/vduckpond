const path = require('path');
const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

const mongo = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongo.connect(err => {
    console.log('connecting');
    const collection = mongo.db('vduckpond').collection('ducks');
    collection.findOne({}, function(err, result) {
        console.log(err);
        if (err) throw err;
        console.log('=======');
        console.log(result);
    })
    mongo.close();
})

//serve React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//handle get requests to /api
app.get('/api', (req, res) => {
    let dateNow = new Date();
    res.json({ message: `it is now ${dateNow.toTimeString().substring(0,5)}` });
    console.log(`time requested - ${dateNow.toTimeString()}`);
});

//all other reqests return React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
