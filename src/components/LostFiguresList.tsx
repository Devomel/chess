import { FC } from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}
export const LostFiguresList: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className='lostFigureWrapper'>
      <h2>{title}</h2>
      <div>
        {figures.map(figure =>
          <span key={figure.id}>
            {figure.logo && <img src={figure.logo || ""} className='lostFigureImg' alt="" />}
          </span>
        )}
      </div>

    </div>
  )
}
