const mysql = require("mysql") // library - mysql node client

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
});

connection.connect();

const users = [
  {
    firstname: "Jozef",
    lastname: "Džejo",
    age: 32,
  },
  {
    firstname: "Iwka",
    lastname: "Modelka",
    age: 19,
  },
  {
    firstname: "Natalka",
    lastname: "RadaVinkova",
    age: 23,
  },
]

users.forEach(({firstname, lastname, age}) => {
  connection.query(`INSERT INTO table_1 (firstname, lastname, age) VALUES ('${firstname}', '${lastname}', '${age}')`, (error, results, fields) => {
    if (error) throw error;
    console.log(results.insertId);
  })
})

connection.end();