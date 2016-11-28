import * as mysql from 'mysql';

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456aA+',
  database: 'note_back_notes'
});



export function queryLabelIdByNameAndPID(name: string, p_id: number, f: (rs: any[]) => void) {
  pool.getConnection(function (err, connection) {
    console.info(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`)
    connection.query(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`, function (err, rows, fields) {
      let rs = rows;
      console.log('The solution is: ', rows);
      connection.release();
      f(rs)
    });
  })
}

export function addLabel(name: string, p_id: number) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query(`insert into labels(name,p_id) values(?,?)`, [name, p_id], function (err, rows, fields) {
      if (err) throw err;
    });
    connection.end();
  })
}

export function deleteLabelById(id: number) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query(`delete from labels where id = ?`, [id], function (err, rows, fields) {
      if (err) throw err;
    });
    connection.end();
  })
}