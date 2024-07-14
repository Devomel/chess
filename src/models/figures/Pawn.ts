import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/white-pawn.png"
import blackLogo from "../../assets/black-pawn.png"

export class Pawn extends Figure {
  isFirstMove: boolean = true

  constructor(color: Colors, cell: Cell) {
    super(cell, color)
    this.name = FigureNames.PAWN
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
  }
  public canAttack(target: Cell): boolean {
    const direction = this.color === Colors.BLACK ? 1 : -1
    if (target.figure?.color === this.color) return false
    return (target.y === this.cell.y + direction && Math.abs(target.x - this.cell.x) === 1 && this.cell.isEnemy(target))
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    const direction = this.color === Colors.BLACK ? 1 : -1
    const firstMoveDirection = this.color === Colors.BLACK ? 2 : -2

    if ((target.y === this.cell.y + direction || this.isFirstMove && (target.y === this.cell.y + firstMoveDirection))
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty()) {
      return true
    }
    return this.canAttack(target)
  }
  moveFigure(target: Cell): void {
    super.moveFigure(target)
    this.isFirstMove = false;
  }
}