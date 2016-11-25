import * as fs from 'fs'
const koa = require('koa');
const router = require('koa-router');

const app = new koa();
const api = new router();

api.get("/index", (ctx) => {
  ctx.type = 'text/html';
  ctx.body = fs.readFileSync("index.html");
}).get("/bundle.js", (ctx) => {
  ctx.type = 'text/javascript';
  ctx.body = fs.readFileSync("bundle.js");
}).post("/api/node", (ctx) => {
  fs.writeFileSync('aaa.json',JSON.stringify(ctx))
  console.info(ctx.request.body)
  ctx.body = 111;
})

app.use(api.routes()).use(api.allowedMethods());

app.listen(3000);