import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

//user, game

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // stop the game here because the user left
  }
  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      let message;
      try {
        message = JSON.parse(data.toString());
      } catch (error) {
        console.error("Failed to parse message:", data.toString());
        console.error("Error:", error);
        return; // Exit the function if parsing fails
      }

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
     const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
        if (game) {
          game.makeMove(socket, message.payload.move);
        }
      }
    });
  }
}

