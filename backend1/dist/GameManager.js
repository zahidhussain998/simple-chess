"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
//user, game
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user !== socket);
        // stop the game here because the user left
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            let message;
            try {
                message = JSON.parse(data.toString());
            }
            catch (error) {
                console.error("Failed to parse message:", data.toString());
                console.error("Error:", error);
                return; // Exit the function if parsing fails
            }
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
// export class GameniManager {
//   private gaming: Game[];
//   private pendinduseres: WebSocket | null;
//   private useres: WebSocket[];
//   constructor() {
//     this.gaming = [];
//     this.pendinduseres = null;
//     this.useres = [];
//   }
//   adduseres(socket: WebSocket) {
//     this.useres.push(socket);
//     this.boardhandler(socket);
//   }
//   private removeusers(socket: WebSocket) {
//     this.useres = this.useres.filter((user) => user != socket);
//   }
//   private boardhandler(socket: WebSocket) {
//     socket.on("message", (data) => {
//       let messages;
//       try {
//         messages = JSON.parse(data.toString());
//       } catch (error) {
//         console.log(error);
//         console.log("this data is not found", data.toString());
//       }
//       if (messages.type === INIT_GAME) {
//         if (this.pendinduseres) {
//           const game = new Game(this.pendinduseres, socket);
//           this.gaming.push(game);
//           this.pendinduseres = null;
//         } else {
//           this.pendinduseres = socket;
//         }
//         if (messages.type === MOVE) {
//           const games = this.gaming.find(
//             (game) => game.player1 === socket || game.player2 === socket
//           );
//           if (games) {
//             games.makeMove(socket, messages.payload.move);
//           }
//         }
//       }
//     });
//   }
// }
