import { Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
import { MOVE } from "../screen/Game";

function ChessBoard({
  board,
  socket,
  setBoard,
  chess,
}: {
  setBoard: any;
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];

  socket: WebSocket;
}) {
  const [from, setFrom] = useState<null | Square>(null);
  return (
    <div className="text-white-200">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {

            const squareRepresention = String.fromCharCode(97 + (j % 8)) + "" + (8-i) as Square;

            return <div onClick={() => {
                  if (!from) {
                    setFrom(squareRepresention);
                  } else {
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: {
                            from,
                            to: squareRepresention,
                          },
                        },
                      })
                    );

                    setFrom(null);
                    chess.move({
                      from,
                      to: squareRepresention,
                    });
                    setBoard(chess.board());      

                    console.log({
                      from,
                      to: squareRepresention,
                    });
                  }
                }}
                key={j}
                className={`w-20 h-20 ${
                  i % 2 === j % 2 ? "bg-green-500" : "bg-white"
                }`}
              >
                <div className="h-full w-full flex justify-center ">
                  <div className=" h-full flex justify-center flex-col">
                   {
                    square ? <img className="w-4" src={`${square?.color === "b" ? 
                      square?.type : `${square?.type?.toLocaleUpperCase()} copy`
                    }.png`}/> : null
                   }
                  </div>
                </div>
              </div>
            
          })}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
