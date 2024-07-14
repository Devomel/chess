import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/white-bishop.png"
import blackLogo from "../../assets/black-bishop.png"
export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(cell, color)
    this.name = FigureNames.BISHOP
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
  }
  canAttack(target: Cell): boolean {
    if (target.figure?.color === this.color) return false
    if (this.cell.isEmptyDiagonals(target)) return true
    return false
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    return this.canAttack(target)
  }
}