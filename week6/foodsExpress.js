require('dotenv').config();
const mysql = require('mysql');

const app = express();
app.use(express.json()); // 이걸 사용해야 req.body 사용 가능

// mysql 계정과 연결
var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.get('/', (req, res) => {
    db.query(`SELECT * FROM foods`, (err, results) => {
        if (err) throw err;
        res.send(results); // res.end(); 를 포함한다.

        console.log("text written: ", JSON.stringify(results));
    });
})

app.get('/:id', (req, res) => { // localhost:8080/3 했을 때
    const id = req.params.id; // id 에 3이 들어온다.
    db.query(`SELECT * FROM foods WHERE id=${id}`, (err, results) => {
        if (err) throw err;
        res.send(results); // res.end(); 를 포함한다.

        console.log("text written: ", JSON.stringify(results));
    });
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM foods WHERE id=${id}`, (err, results) => {
        res.send("DELETE!");
    })
})

app.push('/', (req, res) => {
    const body = req.body;
    db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}', '${body.isVegan}')`, (err, results) => {
        if (err) throw err;
        res.send("POST!"); // res.end(); 를 포함한다.

        console.log("text written: ", JSON.stringify(results));
    });
})

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WEHRE id='${id}'`, (err, results) => {
        if (err) throw err;
        res.send("POST!"); // res.end(); 를 포함한다.

        console.log("text written: ", JSON.stringify(results));
    });
})

app.listen(8080, () => {
    console.log("server run on 8080 port.");
})