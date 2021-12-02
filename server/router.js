const express = require('express');

let app = express.Router();

// handle API requests (prefix /api/)
app.get('/', (req, res) => {
    let dateNow = new Date();
    res.json({ message: `it is now ${dateNow.toTimeString().substring(0,5)}` });
    console.log(`time requested - ${dateNow.toTimeString()}`);
});

app.get('/ducks', function (req, res) {
    res.json({ message: 'list of ducks' });
});

app.get('/ducks/:name', function (req, res) {
    res.json({ message: 'duck named ' + req.params.name  });
});

app.get('/pond', function (req, res) {
    res.json({ message: 'the pond' });
});

module.exports = app;
