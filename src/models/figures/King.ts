import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/white-king.png"
import blackLogo from "../../assets/black-king.png"
import { Cell } from "../Cell";

export class King extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(cell, color)
    this.name = FigureNames.KING
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
  }
  canKingMove(target: Cell): boolean {
    return (Math.abs(target.x - this.cell.x) === 1 || Math.abs(target.y - this.cell.y) === 1)
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    if (this.cell.isEmptyVerticals(target) && this.canKingMove(target)) return true
    if (this.cell.isEmptyHorizontals(target) && this.canKingMove(target)) return true
    if (this.cell.isEmptyDiagonals(target) && this.canKingMove(target)) return true
    return false
  }

}