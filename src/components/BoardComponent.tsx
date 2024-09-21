import { FC, Fragment, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { CellComponent } from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface IBoardProps {
  board: Board;
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

const BoardComponent: FC<IBoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {


  const [fen, setFen] = useState<string>("")
  const [evaluation, setEvaluation] = useState(0)
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const [isCheckMateState, setIsCheckmate] = useState(board.isCheckMate)
  useEffect(() => {
    highlightCells()
  }, [selectedCell])
  useEffect(() => {
    (async () => {
      const response = await fetch("https://stockfish.online/api/s/v2.php?depth=12&fen=" + fen)
      const data = await response.json();
      setEvaluation(data.evaluation)
    })()
  }, [fen])
  const clickOnCell = (cell: Cell) => {
    if (selectedCell && selectedCell != cell && selectedCell.figure?.canMove(cell) && cell.available) {
      selectedCell.moveFigure(cell)
      board.changeFENPosition(currentPlayer)
      setFen(board.fen)
      if (currentPlayer) board.checkIsCheckMate(currentPlayer.color)
      if (board.isCheckMate[0]) {
        setIsCheckmate(board.isCheckMate)
      }
      swapPlayer()
      setSelectedCell(null)

    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard()
  }
  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }
  return (
    <div>
      {
        isCheckMateState[0] && <h1>{
          isCheckMateState[1] === Colors.BLACK
            ? "Білі  " : "Чорні  "
        } Перемогли</h1>
      }
      <h1>Оцінка позиції: {evaluation}</h1>
      <div className="board">
        {
          board.cells.map((row, index) =>
            <Fragment key={index}>
              {row.map(cell =>
                <CellComponent
                  cell={cell}
                  key={cell.id}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  click={clickOnCell}
                />)}
            </Fragment>
          )
        }

      </div>
    </div>

  )
}
export default BoardComponent