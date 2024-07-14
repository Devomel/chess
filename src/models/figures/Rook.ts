import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/white-rook.png"
import blackLogo from "../../assets/black-rook.png"
export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(cell, color)
    this.name = FigureNames.ROOK
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
  }
  canAttack(target: Cell): boolean {
    if (target.figure?.color === this.color) return false
    if (this.cell.isEmptyHorizontals(target)) return true
    if (this.cell.isEmptyVerticals(target)) return true
    return false
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    return this.canAttack(target)
  }
}
