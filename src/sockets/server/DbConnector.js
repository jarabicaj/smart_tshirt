import mysql from 'mysql';
import { format } from 'date-fns';
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'test',
// });

class DbConnector {
  connection;

  constructor(connectionArgs) {
    this.connection = mysql.createConnection(connectionArgs);
  }

  save(name, data) {
    const amplitude = data.amplitude;
    const timeStamp = format(data.time, 'YYYY-MM-DD HH:mm:s.SSS');
    this.connection.query(`INSERT INTO smart_tshirt (name, amplitude, time) VALUES ('${name}', '${amplitude}', '${timeStamp}')`,
      (error, results, fields) => {
        if (error) throw error;
        console.log("saved", results, fields)
      },
    );
  };

  openConnection() {

  }

  closeConnection() {

  }

}

export default DbConnector
