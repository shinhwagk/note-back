import * as fs from 'fs';
import * as db from './db';

const koa = require('koa');
const router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
import * as bodyParser from 'koa-bodyparser';
const app = new koa();
const api = new router();

api.get("/index", (ctx) => {
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync("dist/index.html");
}).get("/bundle.js", (ctx) => {
    ctx.type = 'text/javascript';
    ctx.body = fs.readFileSync("dist/bundle.js");
}).post("/api/node", (ctx) => {
    // fs.writeFileSync('aaa.json',JSON.stringify(ctx))
    console.info(ctx.request.body)
    ctx.body = 111;
}).post("/api/node/label", (ctx) => {
    ctx.body = ctx.request.body;
})

app.use(bodyParser());

app.use(api.routes()).use(api.allowedMethods());

// app.listen(3000);



function applyLabel(labelsStr: string) {
    const labels: string[] = labelsStr.split('-').reverse();
    ccc(labels, 0)
}

function ccc(labels: string[], id: number) {
    if (labels.length >= 1) {
        const label: string = labels.pop();
        console.info(label)
        db.queryLabelIdByNameAndPID(label, id, (rows: any[]) => {
            if (rows.length >= 1) {
                console.info(labels, rows)
                console.info("111111111111111111111111111111111111111111")
                ccc(labels, rows[0].id)
            } else {
                console.info(id)
                db.addLabel(label, id)
            }
        })
    }
}

ccc(["oracle", "fff","xxx1"].reverse(), 0)