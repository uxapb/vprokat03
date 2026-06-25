import avensisComfort from '../assets/cars/avensis06.jpg'
import avensisDetail from '../assets/cars/avensis03.jpg'
import avensisBusiness from '../assets/cars/avensis07.jpg'
import fitEconomy from '../assets/cars/fit03.jpg'
import priusHybrid from '../assets/cars/prius06.jpg'

export const PHONE_HREF = 'tel:89140570842'
export const PHONE_DISPLAY = '8 (914) 057-08-42'
export const EMAIL = 'Bprokat03@yandex.ru'
export const ADDRESS = 'г. Улан-Удэ, ул. Сахьяновой, 11'

export const NAV_LINKS = [
  { label: 'Автомобили', href: '#cars' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

export const HERO_FEATURES = [
  { icon: 'shield', text: 'Без скрытых платежей' },
  { icon: 'clock', text: 'Подача авто от 30 минут' },
  { icon: 'wrench', text: 'Технически исправные авто' },
]

export const ADVANTAGES = [
  {
    icon: 'shield',
    title: 'Честные условия',
    description: 'Никаких скрытых платежей и навязанных услуг. Всё прозрачно и понятно.',
  },
  {
    icon: 'clock',
    title: 'Быстрая подача',
    description: 'Подача автомобиля в удобное для вас место в среднем за 30 минут.',
  },
  {
    icon: 'car',
    title: 'Современный автопарк',
    description: 'Только ухоженные, технически исправные автомобили разных классов.',
  },
  {
    icon: 'trophy',
    title: 'Опыт работы',
    description:
      'Более 5 лет профессионально оказываем услугу по аренде автомобилей в г. Улан-Удэ. Более 1000 довольных клиентов.',
  },
]

export const CARS = [
  {
    id: 'avensis06',
    name: 'Toyota Avensis',
    year: 2006,
    image: avensisComfort,
    steering: 'Левый',
    doors: 4,
    transmission: 'Механика',
    seats: 5,
    price: 2500,
  },
  {
    id: 'fit03',
    name: 'Honda Fit',
    year: 2003,
    image: fitEconomy,
    steering: 'Левый',
    doors: 5,
    transmission: 'Автомат',
    seats: 5,
    price: 2500,
  },
  {
    id: 'avensis03',
    name: 'Toyota Avensis',
    year: 2003,
    image: avensisDetail,
    steering: 'Левый',
    doors: 4,
    transmission: 'Механика',
    seats: 5,
    price: 2500,
  },
  {
    id: 'avensis07',
    name: 'Toyota Avensis',
    year: 2007,
    image: avensisBusiness,
    steering: 'Левый',
    doors: 4,
    transmission: 'Механика',
    seats: 5,
    price: 2500,
  },
  {
    id: 'prius06',
    name: 'Toyota Prius',
    year: 2006,
    image: priusHybrid,
    steering: 'Левый',
    doors: 4,
    transmission: 'Автомат',
    seats: 5,
    price: 2500,
  },
] as const

export type Car = (typeof CARS)[number]

const GALLERY_POOL = [avensisComfort, fitEconomy, avensisDetail, avensisBusiness, priusHybrid]

export function getCarGallery(car: Car): string[] {
  const others = GALLERY_POOL.filter((img) => img !== car.image)
  return [car.image, others[0], others[1]]
}

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Алексей К.',
    date: '28 мая 2026',
    text: 'Отличный сервис! Брал машину на выходные, всё прошло быстро и без проблем. Автомобиль был чистый и в отличном состоянии.',
    avatar: 'АК',
  },
  {
    id: 2,
    name: 'Мария С.',
    date: '9 февраля 2026',
    text: 'Удобно, что можно заказать подачу авто к дому. Менеджеры вежливые, условия аренды понятные. Рекомендую!',
    avatar: 'МС',
  },
  {
    id: 3,
    name: 'Дмитрий В.',
    date: '15 октября 2025',
    text: 'Арендовал авто для деловой поездки. Всё чётко, без лишней бюрократии. Цены адекватные, буду обращаться ещё.',
    avatar: 'ДВ',
  },
  {
    id: 4,
    name: 'Елена П.',
    date: '3 августа 2025',
    text: 'Первый раз брала машину в прокат — переживала, но всё оказалось проще, чем думала. Спасибо за помощь!',
    avatar: 'ЕП',
  },
]

export const FOOTER_SERVICES = [
  'Аренда на сутки',
  'Аренда на выходные',
  'Долгосрочная аренда',
  'Подача авто',
]
