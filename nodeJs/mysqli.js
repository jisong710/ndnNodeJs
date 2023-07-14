import mysql from 'mysql';

function mysqli() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ndn'
    });
    return connection;
}


export default mysqli;