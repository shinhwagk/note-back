"use strict";
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456aA+',
    database: 'note_back_notes'
});
connection.connect();
function queryLabelByNameAndPID(name, p_id) {
    return new Promise((resolve, reject) => {
        console.info(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`);
        connection.query(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`, function (err, rows, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.queryLabelByNameAndPID = queryLabelByNameAndPID;
function queryLabelIdByNameAndPID(name, p_id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * from labels where p_id = ${p_id} and name = '${name}'`, function (err, rows, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.queryLabelIdByNameAndPID = queryLabelIdByNameAndPID;
function addLabel(name, p_id) {
    return new Promise((resolve, reject) => {
        connection.query(`insert into labels(name,p_id) values(?,?)`, [name, p_id], function (err, rows, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows.insertId);
            }
        });
    });
}
exports.addLabel = addLabel;
function addCategory(name, l_id) {
    return new Promise((resolve, reject) => {
        connection.query(`insert into categorys(name,l_id) values(?,?)`, [name, l_id], function (err, rows, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows.insertId);
            }
        });
    });
}
exports.addCategory = addCategory;
function queryCategoryByNameAndLid(name, l_id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * from categorys where l_id = ? and name = ?`, [name, l_id], function (err, rows, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
exports.queryCategoryByNameAndLid = queryCategoryByNameAndLid;
function deleteLabelById(id) {
    connection.connect();
    connection.query(`delete from labels where id = ?`, [id], function (err, rows, fields) {
        if (err)
            throw err;
    });
    connection.end();
}
exports.deleteLabelById = deleteLabelById;
// connection.connect();
// queryLabelIdByNameAndPID("oracle", 0).then(console.info)
// connection.end() 
