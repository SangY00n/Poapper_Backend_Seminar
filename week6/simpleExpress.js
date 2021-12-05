const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.delete('/', (req, res) => {
    //...
})

app.get('/aa', (req, res) => {
    //...
})

app.post('/', (req, res) => {
    const body = req.body;
})

app.listen(8080, () => {
    console.log("server run on 8080 port.");
})