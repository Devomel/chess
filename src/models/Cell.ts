import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  isUnderAttack: boolean;
  figure: Figure | null;
  board: Board
  available: boolean;
  id: number

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.available = false;
    this.board = board;
    this.id = Math.random()
    this.figure = figure
    this.isUnderAttack = false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  public moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target) && target.available) {
      this.figure.moveFigure(target)
      this.board.currentPlayer = this.figure.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE

      if (this.figure.name === FigureNames.KING) {
        this.board.changeKingPosition(target, this.figure.color)
      }

      if (target.figure) {
        target.figure.color === Colors.BLACK
          ? this.board.lostBlackFigures.push(target.figure)
          : this.board.lostWhiteFigures.push(target.figure)
      }
      target.setFigure(this.figure)
      this.figure = null
    }
  }
  isEmpty(): boolean {
    return this.figure === null
  }
  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return target.figure?.color !== this.figure?.color
    }
    return false
  }
  isEmptyVerticals(target: Cell): boolean {
    if (this.x !== target.x) return false
    const min = Math.min(target.y, this.y)
    const max = Math.max(target.y, this.y)
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) return false
    }
    return true;
  }

  isEmptyHorizontals(target: Cell): boolean {
    if (this.y !== target.y) return false
    const min = Math.min(target.x, this.x)
    const max = Math.max(target.x, this.x)
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) return false
    }
    return true;
  }
  isEmptyDiagonals(target: Cell): boolean {
    const absY = Math.abs(target.y - this.y)
    const absX = Math.abs(target.x - this.x)
    if (absX !== absY) return false

    const directionX = this.x < target.x ? 1 : -1
    const directionY = this.y < target.y ? 1 : -1

    for (let i = 1; i < absX; i++) {
      if (!this.board.getCell(this.x + directionX * i, this.y + directionY * i,).isEmpty()) return false
    }
    return true
  }
}
