import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useState, type MouseEvent } from 'react'
import { CARS, getCarGallery, type Car } from '../constants/content'
import { CarDetailModal } from './CarDetailModal'
import './CarFleet.css'

interface CarCardProps {
  car: Car
  onDetails: (car: Car) => void
}

function CarCard({ car, onDetails }: CarCardProps) {
  const gallery = getCarGallery(car)
  const [slide, setSlide] = useState(0)

  const goPrev = (e: MouseEvent) => {
    e.stopPropagation()
    setSlide((i) => (i === 0 ? gallery.length - 1 : i - 1))
  }

  const goNext = (e: MouseEvent) => {
    e.stopPropagation()
    setSlide((i) => (i === gallery.length - 1 ? 0 : i + 1))
  }

  return (
    <article className="car-fleet__card">
      <div className="car-fleet__media">
        <img
          className="car-fleet__image"
          src={gallery[slide]}
          alt={`${car.name} ${car.year}`}
          loading="lazy"
        />

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              className="car-fleet__nav car-fleet__nav--prev"
              onClick={goPrev}
              aria-label="Предыдущее фото"
            >
              <LeftOutlined />
            </button>
            <button
              type="button"
              className="car-fleet__nav car-fleet__nav--next"
              onClick={goNext}
              aria-label="Следующее фото"
            >
              <RightOutlined />
            </button>
            <div className="car-fleet__dots">
              {gallery.map((_, index) => (
                <span
                  key={index}
                  className={`car-fleet__dot${index === slide ? ' car-fleet__dot--active' : ''}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="car-fleet__badges">
          <span className="car-fleet__badge">{car.transmission}</span>
          <span className="car-fleet__badge">{car.steering} руль</span>
        </div>
      </div>

      <div className="car-fleet__body">
        <h3 className="car-fleet__title">
          {car.name} {car.year}г.
        </h3>
        <p className="car-fleet__price">
          от {car.price.toLocaleString('ru-RU')} ₽<span>/сут.</span>
        </p>
        <button type="button" className="car-fleet__details-btn" onClick={() => onDetails(car)}>
          Детали
        </button>
      </div>
    </article>
  )
}

interface CarFleetProps {
  onBookClick: () => void
}

export function CarFleet({ onBookClick }: CarFleetProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  const handleBookFromDetail = () => {
    setSelectedCar(null)
    onBookClick()
  }

  return (
    <section id="cars" className="car-fleet">
      <div className="container">
        <div className="car-fleet__grid">
          {CARS.map((car) => (
            <CarCard key={car.id} car={car} onDetails={setSelectedCar} />
          ))}
        </div>
      </div>

      <CarDetailModal
        car={selectedCar}
        open={selectedCar !== null}
        onClose={() => setSelectedCar(null)}
        onBook={handleBookFromDetail}
      />
    </section>
  )
}
