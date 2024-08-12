import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const getManager = new GameManager
const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws) {
  getManager.addUser(ws)
  ws.on("disconnect", () => getManager.removeUser(ws))
});






 
      
  