import { FC, useEffect } from "react";
import { Board } from "../../models/Board";
import { Player } from "../../models/Player";
import { useBoardLogic } from "../../hooks/useBoardLogic";
import { BoardUI } from "./BoardUI";
import { GameStatus } from "./GameStatus";

interface IBoardProps {
   board: Board;
   setBoard: (board: Board) => void;
   currentPlayer: Player;
   swapPlayer: () => void;
}

export const BoardSection: FC<IBoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
   const {
      evaluation,
      selectedCell,
      isCheckMateState,
      clickOnCell,
      highlightCells,
   } = useBoardLogic(board, currentPlayer, swapPlayer);

   useEffect(() => {
      highlightCells();
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
   }, [selectedCell]);

   return (
      <div>
         <GameStatus isCheckMateState={isCheckMateState} evaluation={evaluation} />
         <BoardUI board={board} selectedCell={selectedCell} onCellClick={clickOnCell} />
      </div>
   );
};