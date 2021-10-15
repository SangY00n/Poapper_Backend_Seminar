// const fs = require('fs');
const http = require('http');



const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url.split('/')[1])
    console.log(url.split('/')[2])
    console.log(url.split('/')[3])
    const operator = url.split('/')[1];
    const operand1 = url.split('/')[2];
    const operand2 = url.split('/')[3];

    var result = 0;

    if (operator == 'add') {
        result = String(Number(operand1) + Number(operand2));
    } else if (operator == 'sub') {
        result = String(Number(operand1) - Number(operand2));
    } else if (operator == 'mul') {
        result = String(Number(operand1) * Number(operand2));
    } else if (operator == 'div') {
        result = String(Number(operand1) / Number(operand2));
    } else {
        result = 'Please enter input according to the format: /operator/num1/num2'
    }

    res.write(result);
    res.end();
});

server.listen(8080);

server.on('listening', () => {
    console.log("server is runnig on 8080 port.")
})

server.on('error', (error) => {
    console.log(error)
})