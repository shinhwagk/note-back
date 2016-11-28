import * as mysql from 'mysql';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456aA+',
  database: 'note_back_notes'
});

connection.connect();

export function queryLabelByNameAndPID(name: string, p_id: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    console.info(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`)
    connection.query(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`, function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    });
  })
}

export function queryLabelIdByNameAndPID(name: string, p_id: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`, function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    });
  })
}

export function addLabel(name: string, p_id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    connection.query(`insert into labels(name,p_id) values(?,?)`, [name, p_id], function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows.insertId)
      }
    });
  });
}

export function addCategory(name: string, l_id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    connection.query(`insert into categorys(name,l_id) values(?,?)`, [name, l_id], function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows.insertId)
      }
    });
  });
}

export function queryCategoryByNameAndLid(name: string, l_id: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * from categorys where l_id = ? and name = ?`, [name, l_id], function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    });
  })
}

export function deleteLabelById(id: number) {
  connection.connect();
  connection.query(`delete from labels where id = ?`, [id], function (err, rows, fields) {
    if (err) throw err;
  });
  connection.end();
}

export function addNote(c_id: number, data: string[]) {
  return new Promise((resolve, reject) => {
    connection.query(`insert into notes(data,c_id) values(?,?)`, [JSON.stringify(data), c_id], function (err, rows, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(rows.insertId)
      }
    });
  });
}

// connection.connect();
// queryLabelIdByNameAndPID("oracle", 0).then(console.info)
// connection.end()