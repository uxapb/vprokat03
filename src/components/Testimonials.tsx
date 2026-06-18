import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import { TESTIMONIALS } from '../constants/content'
import './Testimonials.css'

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3
  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount)

  const handlePrev = () => setStartIndex((i) => Math.max(0, i - 1))
  const handleNext = () => setStartIndex((i) => Math.min(maxIndex, i + 1))

  const visible = TESTIMONIALS.slice(startIndex, startIndex + visibleCount)

  return (
    <section id="reviews" className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div>
            <p className="section-label">Отзывы клиентов</p>
            <h2 className="section-title">Что говорят наши клиенты</h2>
          </div>

          <div className="testimonials__nav">
            <Button
              shape="circle"
              className="testimonials__nav-btn"
              icon={<LeftOutlined />}
              onClick={handlePrev}
              disabled={startIndex === 0}
            />
            <Button
              shape="circle"
              className="testimonials__nav-btn"
              icon={<RightOutlined />}
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
            />
          </div>
        </div>

        <div className="testimonials__grid">
          {visible.map((item) => (
            <article key={item.id} className="testimonials__card">
              <div className="testimonials__card-header">
                <div className="testimonials__avatar">{item.avatar}</div>
                <div>
                  <h3 className="testimonials__name">{item.name}</h3>
                  <div className="testimonials__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonials__text">{item.text}</p>
              <time className="testimonials__date">{item.date}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
