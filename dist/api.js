"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require("fs");
const db = require("./db");
const koa = require('koa');
const router = require('koa-router');
const bodyParser = require("koa-bodyparser");
const app = new koa();
const api = new router();
api.get("/index", (ctx) => {
    ctx.type = 'text/html';
    ctx.body = fs.readFileSync("dist/index.html");
}).get("/bundle.js", (ctx) => {
    ctx.type = 'text/javascript';
    ctx.body = fs.readFileSync("dist/bundle.js");
}).post("/api/node/label", (ctx) => __awaiter(this, void 0, void 0, function* () {
    const labels = ctx.request.body;
    const id = yield apllyLabel(labels.reverse(), 0);
    ctx.body = id;
})).post("/api/node/category", (ctx) => __awaiter(this, void 0, void 0, function* () {
    const [name, l_id] = ctx.request.body;
    const id = yield apllyCategory(name, l_id);
    ctx.body = id;
})).post("/api/node/node", (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { c_id, data } = ctx.request.body;
    const id = yield db.addNote(c_id, data);
    ctx.body = id;
}));
app.use(bodyParser());
app.use(api.routes()).use(api.allowedMethods());
app.listen(3000);
function apllyLabel(labels, pid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (labels.length >= 1) {
            const label = labels.pop();
            const rows = yield db.queryLabelByNameAndPID(label, pid);
            let id;
            if (rows.length === 0) {
                id = yield db.addLabel(label, pid);
            }
            else {
                id = rows[0].id;
            }
            return yield apllyLabel(labels, id);
        }
        else {
            return pid;
        }
    });
}
function apllyCategory(name, l_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield db.queryCategoryByNameAndLid(name, l_id);
        let id;
        if (rows.length === 0) {
            id = yield db.addCategory(name, l_id);
        }
        else {
            id = rows[0].id;
        }
        return id;
    });
}
