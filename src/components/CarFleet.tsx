import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { CARS } from '../constants/content'
import './CarFleet.css'

interface CarFleetProps {
  onBookClick: () => void
}

export function CarFleet({ onBookClick }: CarFleetProps) {
  return (
    <section id="cars" className="car-fleet">
      <div className="container">
        <div className="car-fleet__grid">
          {CARS.map((car) => (
            <div
              key={car.id}
              className={`car-fleet__card car-fleet__card--${car.layout}`}
            >
              <span className="car-fleet__badge">{car.badge}</span>
              <img
                className="car-fleet__image"
                src={car.image}
                alt={car.badge}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="car-fleet__action">
          <Button
            type="primary"
            size="large"
            className="car-fleet__cta"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={onBookClick}
          >
            Забронировать авто
          </Button>
        </div>
      </div>
    </section>
  )
}