const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//serve React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//handle get requests to /api
app.get('/api', (req, res) => {
    res.json({ message: "message from server" });
});

//all other reqests return React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
