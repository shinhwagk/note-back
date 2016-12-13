import * as mysql from 'mysql';
import * as fs from 'fs';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456aA+',
    database: 'note_back_notes'
});

connection.connect();

export function queryLabels(p_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * from labels where p_id = ?`, [p_id], function (err, rows, fields) {
            if (err) { reject(err) } else { resolve(rows) }
        });
    })
}

export function queryLabelById(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * from labels where id = ?`, [id], function (err, rows, fields) {
            if (err) { reject(err) } else { resolve(rows) }
        });
    })
}

export function queryCategorys(l_id: number): Promise<[number, string][]> {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * from categorys where l_id = ?`, [l_id], function (err, rows, fields) {
            if (err) { reject(err) } else { resolve(rows.map(row => [row.id, row.name])) }
        });
    })
}

export function queryNoteByCid(c_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT data from notes where c_id = ?`, [c_id], function (err, rows, fields) {
            console.info(rows, 1111)
            if (err) { reject(err) } else { resolve(rows) }
        });
    })
}

async function loadLabel(path = './data/index', p_id = 0) {
    fs.mkdirSync(path)
    const rows = await queryLabels(p_id)
    const labels = rows.map(row => row.name)
    let notes = []
    if (p_id != 0) {
        // const label: string = await queryLabelById(p_id)[0]
        const categorys: [number, string][] = await queryCategorys(p_id)
        notes = await Promise.all(categorys.map(([id, name]) => queryNoteByCid(id).then(rows => [name, rows.map(row => JSON.parse(row.data))])))
    }

    const note = { labels: labels, notes: notes }

    fs.writeFileSync(path + '.json', JSON.stringify(note))

    rows.forEach(row => {
        const rootPath = path + '/' + row.name
        loadLabel(rootPath, row.id)
    })
}

// function loadCategory(l_id) {
//     queryCategorys(l_id).then(categorys => {
//         categorys.forEach(category => {
//             const filePath = path + category.name + '.json'
//             fs.writeFileSync(filePath)
//         })
//     })
// }


loadLabel();