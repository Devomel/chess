
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
  isCheckMate: [boolean, Colors | null] = [false, null]
  cells: Cell[][] = []
  blackKingPosition: number[] = [4, 0]
  whiteKingPosition: number[] = [4, 7]
  currentPlayer: Colors = Colors.WHITE
  lostWhiteFigures: Figure[] = []
  lostBlackFigures: Figure[] = []
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        ((i + j) % 2 !== 0) ? row.push(new Cell(this, j, i, Colors.BLACK, null)) : row.push(new Cell(this, j, i, Colors.WHITE, null))
      }
      this.cells.push(row)
    }
  }
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }
  private addRooks() {
    for (let i = 0; i < 8; i += 7) {
      new Rook(Colors.BLACK, this.getCell(i, 0))
      new Rook(Colors.WHITE, this.getCell(i, 7))
    }
  }
  private addKnights() {
    for (let i = 1; i < 8; i += 5) {
      new Knight(Colors.BLACK, this.getCell(i, 0))
      new Knight(Colors.WHITE, this.getCell(i, 7))
    }
  }
  private addBishops() {
    for (let i = 2; i < 8; i += 3) {
      new Bishop(Colors.BLACK, this.getCell(i, 0))
      new Bishop(Colors.WHITE, this.getCell(i, 7))
    }
  }
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))
  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }

  public changeKingPosition(target: Cell, color: Colors) {
    color === Colors.BLACK
      ? this.blackKingPosition = [target.x, target.y]
      : this.whiteKingPosition = [target.x, target.y]
  }
  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells.map(function (arr) {
      return arr.slice();
    });
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    newBoard.lostBlackFigures = this.lostBlackFigures
    return newBoard
  }

  public getCell(x: number, y: number): Cell {
    return this.cells[y][x]
  }
  public checkIsCheckMate(color: Colors) {
    let checkMateColor = Colors.BLACK;
    const colorPlayer = color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
    for (let selectedCellIndex = 0; selectedCellIndex < 64; selectedCellIndex++) {
      const selectedCell = this.getCell(selectedCellIndex % 8, Math.floor(selectedCellIndex / 8))
      if (!selectedCell.figure || selectedCell.figure.color == color) {
        continue
      }
      for (let i = 0; i < this.cells.length; i++) {
        const row = this.cells[i];
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          if (selectedCell?.figure?.canMove(target)) {
            // Зробимо хід
            const previousTargetFigure = target.figure;
            const previousSelectedCellFigure: Figure = selectedCell.figure;
            target.figure = selectedCell.figure;

            selectedCell.figure = null;

            // Перевіримо, чи король під загрозою
            const isUnderAttack = this.isKingUnderAttack(selectedCell, colorPlayer);
            // Відмінимо хід
            selectedCell.figure = previousSelectedCellFigure;
            target.figure = previousTargetFigure;
            if (!isUnderAttack) {
              console.log(selectedCell, colorPlayer)
              return false;
            }
          }
        }
      }
      checkMateColor = colorPlayer
    }
    this.isCheckMate = [true, checkMateColor]
  }
  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];

        if (selectedCell && selectedCell?.figure?.canMove(target)) {
          // Зробимо хід
          const previousTargetFigure = target.figure;
          const previousSelectedCellFigure = selectedCell.figure;
          target.figure = selectedCell.figure;
          const color = selectedCell.figure.color
          selectedCell.figure = null;

          // Перевіримо, чи король під загрозою
          const isUnderAttack = this.isKingUnderAttack(selectedCell, color);
          // Відмінимо хід
          selectedCell.figure = previousSelectedCellFigure;
          target.figure = previousTargetFigure;

          // Підсвічуємо клітинку, якщо король не під загрозою
          target.available = !isUnderAttack;
        } else {
          target.available = false;
        }
      }
    }
  }

  public isKingUnderAttack(selectedCell: Cell | null, color: Colors): boolean {
    if (!selectedCell) return false;
    const currentKingCell = color === Colors.BLACK
      ? this.getCell(this.blackKingPosition[0], this.blackKingPosition[1])
      : this.getCell(this.whiteKingPosition[0], this.whiteKingPosition[1])
    const direction = currentKingCell.figure?.color === Colors.BLACK ? -1 : 1;

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        const deltaX = Math.abs(currentKingCell.x - target.x);
        const deltaY = Math.abs(currentKingCell.y - target.y);
        if (currentKingCell.isEmptyDiagonals(target) && currentKingCell.isEnemy(target) && (target.figure?.name === FigureNames.BISHOP || target.figure?.name === FigureNames.QUEEN)) {
          return true;
        }
        if (currentKingCell.isEmptyVerticals(target) && currentKingCell.isEnemy(target) && (target.figure?.name === FigureNames.ROOK || target.figure?.name === FigureNames.QUEEN)) {
          return true;
        }
        if (currentKingCell.isEmptyHorizontals(target) && currentKingCell.isEnemy(target) && (target.figure?.name === FigureNames.ROOK || target.figure?.name === FigureNames.QUEEN)) {
          return true;
        }
        if ((target.y === currentKingCell.y + direction && Math.abs(target.x - currentKingCell.x) === 1) && currentKingCell.isEnemy(target) && (target.figure?.name === FigureNames.PAWN)) {
          return true;
        }
        if (((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)) && currentKingCell.isEnemy(target) && (target.figure?.name === FigureNames.KNIGHT)) {
          return true;
        }
      }
    }
    return false;
  }

  public addFigures() {
    this.addPawns()
    this.addRooks()
    this.addKnights()
    this.addBishops()
    this.addKings()
    this.addQueens()
  }
}