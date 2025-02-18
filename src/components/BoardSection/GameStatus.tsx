import { FC } from "react";
import { Colors } from "../../models/Colors";

interface IGameStatusProps {
   isCheckMateState: [boolean, Colors];
   evaluation: number;
}

export const GameStatus: FC<IGameStatusProps> = ({ isCheckMateState, evaluation }) => {
   return (
      <div>
         {isCheckMateState[0] && (
            <h1>
               {isCheckMateState[1] === Colors.BLACK ? "Білі " : "Чорні "} Перемогли
            </h1>
         )}
         <h1>Оцінка позиції: {evaluation}</h1>
      </div>
   );
};