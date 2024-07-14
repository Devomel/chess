import { Cell } from "../Cell";
import { Colors } from "../Colors";
import logo from '../../assets/black-king.png'
export enum FigureNames {
  FIGURE = "FIGURE",
  PAWN = "PAWN",
  KING = "KING",
  QUEEN = "QUEEN",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  ROOK = "ROOK",

}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  constructor(cell: Cell, color: Colors) {
    this.cell = cell;
    this.color = color;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random()
    this.cell.figure = this
  }


  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false
    if (target.figure?.name === FigureNames.KING) return false


    return true
  }



  canAttack(target: Cell) {
  }

  moveFigure(target: Cell) {
  }
}