import { useEffect, useState } from "react";
import "./App.css"
import BoardComponent from "./components/BoardComponent"
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import { LostFiguresList } from "./components/LostFiguresList";
function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, _setWhitePlayer] = useState<Player | null>(new Player(Colors.WHITE))
  const [blackPlayer, _setBlackPlayer] = useState<Player | null>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(whitePlayer)
  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])
  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
  }

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setBoard(newBoard)
  }
  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className="lostFiguresList">
        <LostFiguresList
          figures={board.lostBlackFigures}
          title={"Black lost figures"} />
        <LostFiguresList
          figures={board.lostWhiteFigures}
          title={"White lost figures"} />
      </div>

    </div>
  )
}

export default App
