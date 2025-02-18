import { FC } from "react";
import { LostFiguresList } from "./LostFiguresList";
import { Board } from "../models/Board";

interface ILostFiguresSectionProps {
   board: Board;
}

export const LostFiguresSection: FC<ILostFiguresSectionProps> = ({ board }) => {
   return (
      <div className="lostFiguresList">
         <LostFiguresList figures={board.lostBlackFigures} title="Black lost figures" />
         <LostFiguresList figures={board.lostWhiteFigures} title="White lost figures" />
      </div>
   );
};