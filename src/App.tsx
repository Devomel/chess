import "./App.css";
import { BoardSection } from "./components/BoardSection/BoardSection";
import { LostFiguresSection } from "./components/LostFiguresSection";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
   const { board, currentPlayer, setBoard, swapPlayer } = useGameLogic();

   return (
      <div className="app">
         <BoardSection
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
         />
         <LostFiguresSection board={board} />
      </div>
   );
}

export default App;