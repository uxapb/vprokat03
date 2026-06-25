import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useState } from 'react'
import { getCarGallery, type Car } from '../constants/content'
import './CarDetailModal.css'

interface CarDetailModalProps {
  car: Car | null
  open: boolean
  onClose: () => void
  onBook: () => void
}

const SPECS: { key: keyof Car; label: string }[] = [
  { key: 'year', label: 'Год выпуска' },
  { key: 'steering', label: 'Расположение руля' },
  { key: 'doors', label: 'Двери' },
  { key: 'transmission', label: 'КПП' },
  { key: 'seats', label: 'Кол-во мест' },
]

export function CarDetailModal({ car, open, onClose, onBook }: CarDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!car) return null

  const gallery = getCarGallery(car)
  const title = `${car.name} ${car.year}г.`

  const handleClose = () => {
    setActiveIndex(0)
    onClose()
  }

  const goPrev = () => setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))
  const goNext = () => setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))

  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleClose}
      footer={null}
      className="car-detail-modal"
      width={720}
      destroyOnHidden
    >
      <div className="car-detail-modal__info">
        <h3 className="car-detail-modal__heading">Характеристики</h3>
        <dl className="car-detail-modal__specs">
          {SPECS.map(({ key, label }) => (
            <div key={key} className="car-detail-modal__spec-row">
              <dt>{label}</dt>
              <dd>{car[key]}</dd>
            </div>
          ))}
        </dl>

        <div className="car-detail-modal__price-row">
          <span className="car-detail-modal__price">
            от {car.price.toLocaleString('ru-RU')} ₽ <span>/сут.</span>
          </span>
        </div>

        <button type="button" className="car-detail-modal__book-btn" onClick={onBook}>
          Забронировать
        </button>
      </div>

      <div className="car-detail-modal__gallery">
        <div className="car-detail-modal__main-image-wrap">
          <img
            className="car-detail-modal__main-image"
            src={gallery[activeIndex]}
            alt={`${title} — фото ${activeIndex + 1}`}
          />
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="car-detail-modal__nav car-detail-modal__nav--prev"
                onClick={goPrev}
                aria-label="Предыдущее фото"
              >
                <LeftOutlined />
              </button>
              <button
                type="button"
                className="car-detail-modal__nav car-detail-modal__nav--next"
                onClick={goNext}
                aria-label="Следующее фото"
              >
                <RightOutlined />
              </button>
            </>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="car-detail-modal__thumbs">
            <button
              type="button"
              className="car-detail-modal__thumb-nav"
              onClick={goPrev}
              aria-label="Предыдущее фото"
            >
              <LeftOutlined />
            </button>
            <div className="car-detail-modal__thumb-list">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`car-detail-modal__thumb${index === activeIndex ? ' car-detail-modal__thumb--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="car-detail-modal__thumb-nav"
              onClick={goNext}
              aria-label="Следующее фото"
            >
              <RightOutlined />
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
