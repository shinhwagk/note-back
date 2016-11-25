import * as fs from 'fs'
const koa = require('koa');
const router = require('koa-router');

const app = new koa();
const api = new router();

api.get("/", (ctx) => {
  ctx.type = 'text/html';
  ctx.body = fs.readFileSync("index.html");
}).get("/bundle.js", (ctx) => {
  ctx.type = 'text/javascript';
  ctx.body = fs.readFileSync("bundle.js");
})

app.use(api.routes()).use(api.allowedMethods());

app.listen(3000);