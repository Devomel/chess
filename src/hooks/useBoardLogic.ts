import { Cell } from './../models/Cell';
import { useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Player } from "../models/Player";


export const useBoardLogic = (board: Board, currentPlayer: Player, swapPlayer: () => void) => {
   const [fen, setFen] = useState<string>("");
   const [evaluation, setEvaluation] = useState(0);
   const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
   const [isCheckMateState, setIsCheckmate] = useState(board.isCheckMate);

   useEffect(() => {
      if (!fen) return;
      (async () => {
         const response = await fetch("https://stockfish.online/api/s/v2.php?depth=12&fen=" + fen);
         const data = await response.json();
         setEvaluation(data.evaluation);
      })();
   }, [fen]);

   const clickOnCell = (cell: Cell) => {
      if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell) && cell.available) {
         selectedCell.moveFigure(cell);
         board.changeFENPosition(currentPlayer);
         setFen(board.fen);
         if (currentPlayer) board.checkIsCheckMate(currentPlayer.color);
         if (board.isCheckMate[0]) {
            setIsCheckmate(board.isCheckMate);
         }
         swapPlayer();
         setSelectedCell(null);
      } else {
         if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
         }
      }
   };

   const highlightCells = () => {
      board.highlightCells(selectedCell);
   };

   return {
      fen,
      evaluation,
      selectedCell,
      isCheckMateState,
      clickOnCell,
      highlightCells,
      setSelectedCell,
   };
};