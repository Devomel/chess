import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/white-knight.png"
import blackLogo from "../../assets/black-knight.png"
export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(cell, color)
    this.name = FigureNames.KNIGHT
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
  }
  canAttack(target: Cell): boolean {
    if (target.figure?.color === this.color) return false
    const deltaX = Math.abs(this.cell.x - target.x)
    const deltaY = Math.abs(this.cell.y - target.y)
    return (deltaX === 1 && deltaY == 2) || (deltaX === 2 && deltaY == 1)
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    return this.canAttack(target)
  }
}