const mysql = require("mysql") // library - mysql node client

const connection = mysql.createConnection({ // definovanie pripojenia k databaze
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
});

connection.connect(); // pokus o pripojenie k databaze

const users = [ // pole
  {                           // objekt 1
    firstname: "Jozef",       // nazov atributu = hodnota atributu
    lastname: "Džejo",
    age: 32,
  },
  {                             // objekt 2
    firstname: "Iwka",
    lastname: "Modelka",
    age: 19,
  },
  {                                 // objekt 3
    firstname: "Natalka",
    lastname: "RadaVinkova",
    age: 23,
  },
]

users.forEach(({firstname, lastname, age}) => {   // pre kazdeho usera sa vykona funkcia a vytiahnem do premennych alebo bez vytiahnutia ale dalej user.firstname atd
  connection.query(`INSERT INTO table_1 (firstname, lastname, age) VALUES ('${firstname}', '${lastname}', '${age}')`, (error, results, fields) => {
    if (error) throw error;
    console.log(results.insertId); // vypise do konzoly id
  })
})

connection.end();
