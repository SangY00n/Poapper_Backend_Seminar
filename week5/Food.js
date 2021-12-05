require('dotenv').config();

const http = require('http');
const mysql = require('mysql');

// mysql 계정과 연결
var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

let database = {};
let idx = 0;



const server = http.createServer((req, res) => {
    console.log("현재 database: ", database);
    const method = req.method;
    const tableName = req.url.split('/')[1];

    if(tableName == 'food')
    {
        if (method == 'GET') {
            console.log("method is GET");
            const query_id = req.url.split('/')[2];
    
    
            console.log("query_id is ", query_id);
            if (query_id == '' || query_id == undefined) {
                db.query(`SELECT * FROM foods`, (err, results) => {
                    if (err) throw err;
                    res.write(JSON.stringify(results));
                    console.log("text written: ", JSON.stringify(results));
                    res.end();
                });
            }
            else if(query_id == 'isVegan') {
                db.query(`SELECT * FROM foods WHERE isVegan = 1`, (err, results) => {
                    if (err) throw err;
                    res.write(JSON.stringify(results));
                    console.log("text written: ", JSON.stringify(results));
                    res.end();
                });
            }
            else if(!isNaN(query_id)) {
                db.query(`SELECT * FROM foods WHERE id=${query_id}`, (err, results) => {
                    if (err) throw err;
                    res.write(JSON.stringify(results));
                    console.log("text written: ", JSON.stringify(results));
                    res.end();
                });
            }
    
        }
        else if (method == 'DELETE') {
            console.log("method is DELETE");
            const query_id = req.url.split('/')[1];
            db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, results) => {
                res.end();
            })
        }
    
        req.on('data', data => {
            console.log(`Data available: ${data}`);
            const body = JSON.parse(data);
            console.log("body 변수: ",body);
    
            if (method == 'POST') {
                console.log("method is POST");
                db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}', '${body.isVegan}')`, (err, results) => {
                    if (err) throw err;
                    res.end();
                });
            }
            else if (method == 'PUT') {
                console.log("method is PUT");
                const query_id = req.url.split('/')[2];
                if(!isNaN(query_id))
                {
                    db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${query_id}`, (err, results) => {
                        if (err) throw err;
                        res.end();
                    });
                }
            }
            res.end();
        })
    }
    
});

server.listen(8080, () => {
    console.log('server is running on 8080 port');
})