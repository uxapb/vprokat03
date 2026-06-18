import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { useState } from 'react'
import { Advantages } from './components/Advantages'
import { BookingModal } from './components/BookingModal'
import { CarFleet } from './components/CarFleet'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Testimonials } from './components/Testimonials'
import { antTheme } from './theme'

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <ConfigProvider theme={antTheme} locale={ruRU}>
      <Header />
      <main>
        <Hero onBookClick={() => setBookingOpen(true)} />
        <Advantages />
        <CarFleet onBookClick={() => setBookingOpen(true)} />
        <Testimonials />
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </ConfigProvider>
  )
}

export default App
