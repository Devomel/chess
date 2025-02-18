import { FC, Fragment } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { CellComponent } from "./CellComponent";

interface IBoardUIProps {
   board: Board;
   selectedCell: Cell | null;
   onCellClick: (cell: Cell) => void;
}

export const BoardUI: FC<IBoardUIProps> = ({ board, selectedCell, onCellClick }) => {
   return (
      <div className="board">
         {board.cells.map((row, index) => (
            <Fragment key={index}>
               {row.map((cell) => (
                  <CellComponent
                     cell={cell}
                     key={cell.id}
                     selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                     click={onCellClick}
                  />
               ))}
            </Fragment>
         ))}
      </div>
   );
};