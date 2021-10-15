const fs = require('fs');
const http = require('http');



const server = http.createServer((req, res) => {
    if (req.url == '/timer') {
        fs.readFile('./timer.html', (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    }
});

server.listen(8080);

server.on('listening', () => {
    console.log("server is runnig on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
})


