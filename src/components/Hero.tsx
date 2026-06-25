import { ArrowRightOutlined, ClockCircleOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import bannerCar from '../assets/banner00.png'
import { HERO_FEATURES } from '../constants/content'
import './Hero.css'

const featureIcons = {
  shield: SafetyOutlined,
  clock: ClockCircleOutlined,
  wrench: ToolOutlined,
}

interface HeroProps {
  onBookClick: () => void
}

export function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">Авто в аренду без лишних хлопот</h1>
          <p className="hero__subtitle">
            Современные автомобили, честные условия и высокий уровень сервиса. Арендуйте авто на
            любой срок — быстро и удобно.
          </p>

          <Button
            type="primary"
            size="large"
            className="hero__cta"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={onBookClick}
          >
            Забронировать авто
          </Button>

          <ul className="hero__features">
            {HERO_FEATURES.map((feature) => {
              const Icon = featureIcons[feature.icon as keyof typeof featureIcons]
              return (
                <li key={feature.text} className="hero__feature">
                  <Icon className="hero__feature-icon" />
                  <span>{feature.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hero__visual">
          <img
            className="hero__car-image"
            src={bannerCar}
            alt="Автомобиль в аренду"
          />
        </div>
      </div>
    </section>
  )
}
