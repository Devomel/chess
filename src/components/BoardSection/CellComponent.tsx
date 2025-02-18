import { FC } from "react"
import { Cell } from "../models/Cell"

interface ICellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void
}

export const CellComponent: FC<ICellProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      className={['cell', cell.color, selected ? "selected" : ""].join(" ")}
      style={{ background: cell.available && cell.figure ? "green" : "" }}>
      {cell.figure?.logo && <img src={cell.figure.logo}></img>}
      {cell.available && !cell.figure && <div className="available"></div>}
    </div>
  )
}
