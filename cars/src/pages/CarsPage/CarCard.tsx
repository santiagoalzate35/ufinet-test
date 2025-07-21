/* src/components/CarCard/CarCard.tsx */
import { Car } from '@/api/cars';
import Button from '@/components/Button/Button';
import './card.css';

interface Props {
  car: Car;
  onEdit:   () => void;
  onDelete: () => void;
}

export default function CarCard({ car, onEdit, onDelete }: Props) {
  return (
    <article className="car-card">
      <header className="car-card__header">
        <h3>
          {car.brand} {car.model}
        </h3>
        <span className="car-card__plate">{car.plate}</span>
      </header>

      <ul className="car-card__list">
        <li>
          <b>Año:</b> {car.year}
        </li>
        <li>
          <b>Color:</b> {car.color}
        </li>
      </ul>

      <footer className="car-card__actions">
        {/* Usamos clases en lugar de variant */}
        <Button className="btn--secondary" onClick={onEdit}>
          Editar
        </Button>
        <Button className="btn--danger" onClick={onDelete}>
          Borrar
        </Button>
      </footer>
    </article>
  );
}
