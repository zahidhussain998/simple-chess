"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const getManager = new GameManager_1.GameManager;
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    getManager.addUser(ws);
    ws.on("disconnect", () => getManager.removeUser(ws));
});
