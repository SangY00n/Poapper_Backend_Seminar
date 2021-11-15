const http = require('http');

let database = [];

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = url_parsed[1];

    console.log(url_parsed);
    console.log(database);

    if (method == 'create') {
        database.push(url_parsed[2]);
        res.end();
    } else if (method == 'read') {
        res.write(database[url_parsed[2]]);
        // 데이터가 push 되지 않은 index에 해당하는 값을 읽고자 할 경우, error가 발생할 수 있다.
    } else if (method == 'update') {
        database[url_parsed[2]] = url_parsed[3];
        // 데이터가 push 되지 않은 index에 해당하는 값을 업데이트 하고자 할 경우, error가 발생할 수 있다.
        res.end();
    } else if (method == 'delete') {
        database.pop();
    }
    res.end();
});

server.listen(8080, () => {
    console.log('8080 port');
})