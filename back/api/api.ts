import * as fs from 'fs';
import * as db from './db';

const koa = require('koa');
const router = require('koa-router');
import * as bodyParser from 'koa-bodyparser';
const app = new koa();
const api = new router();

api.get("/index", (ctx) => {
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync("dist/index.html");
}).get("/bundle.js", (ctx) => {
    ctx.type = 'text/javascript';
    ctx.body = fs.readFileSync("dist/bundle.js");
}).post("/api/node/label", async (ctx) => {
    const labels = ctx.request.body
    const id = await apllyLabel(labels.reverse(), 0)
    ctx.body = id
}).post("/api/node/category", async (ctx) => {
    const [name, l_id]: [string, number] = ctx.request.body
    const id = await apllyCategory(name, l_id)
    ctx.body = id
}).post("/api/node/node", async (ctx) => {
    const {c_id, data} = ctx.request.body
    const id = await db.addNote(c_id, data)
    ctx.body = id
})

app.use(bodyParser());

app.use(api.routes()).use(api.allowedMethods());

app.listen(3000);

async function apllyLabel(labels: string[], pid: number): Promise<number> {
    if (labels.length >= 1) {
        const label: string = labels.pop();
        const rows = await db.queryLabelByNameAndPID(label, pid);
        let id: number
        if (rows.length === 0) {
            id = await db.addLabel(label, pid);
        } else {
            id = rows[0].id
        }
        return await apllyLabel(labels, id)
    } else {
        return pid
    }
}

async function apllyCategory(name: string, l_id: number): Promise<number> {
    const rows = await db.queryCategoryByNameAndLid(name, l_id)
    let id: number
    if (rows.length === 0) {
        id = await db.addCategory(name, l_id)
    } else {
        id = rows[0].id
    }
    return id;
}