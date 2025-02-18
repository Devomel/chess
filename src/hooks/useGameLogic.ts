import { useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

export const useGameLogic = () => {
   const [board, setBoard] = useState(new Board());
   const [currentPlayer, setCurrentPlayer] = useState<Player>(new Player(Colors.WHITE));

   useEffect(() => {
      restart();
      setCurrentPlayer(new Player(Colors.WHITE));
   }, []);

   const restart = () => {
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      setBoard(newBoard);
   };

   const swapPlayer = () => {
      setCurrentPlayer((prevPlayer) =>
         prevPlayer.color === Colors.BLACK ? new Player(Colors.WHITE) : new Player(Colors.BLACK)
      );
   };

   return {
      board,
      currentPlayer,
      restart,
      swapPlayer,
      setBoard
   };
};