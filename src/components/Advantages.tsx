import {
  CarOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
  SafetyOutlined,
} from '@ant-design/icons'
import { ADVANTAGES } from '../constants/content'
import './Advantages.css'

const advantageIcons = {
  shield: SafetyOutlined,
  clock: ClockCircleOutlined,
  car: CarOutlined,
  headset: CustomerServiceOutlined,
}

export function Advantages() {
  return (
    <section id="advantages" className="advantages">
      <div className="container">
        <p className="section-label">Наши преимущества</p>
        <h2 className="section-title">Почему клиенты выбирают нас</h2>

        <div className="advantages__grid">
          {ADVANTAGES.map((item) => {
            const Icon = advantageIcons[item.icon as keyof typeof advantageIcons]
            return (
              <div key={item.title} className="advantages__card">
                <div className="advantages__icon-wrap">
                  <Icon className="advantages__icon" />
                </div>
                <h3 className="advantages__card-title">{item.title}</h3>
                <p className="advantages__card-text">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
