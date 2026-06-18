import avensisComfort from '../assets/cars/avensis06.jpg'
import avensisDetail from '../assets/cars/avensis03.jpg'
import avensisBusiness from '../assets/cars/avensis07.jpg'
import fitEconomy from '../assets/cars/fit03.jpg'
import priusHybrid from '../assets/cars/prius06.jpg'

export const PHONE_HREF = 'tel:89140570842'
export const PHONE_DISPLAY = '8 (914) 057-08-42'

export const NAV_LINKS = [
  { label: 'Автомобили', href: '#cars' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Условия', href: '#conditions' },
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
    description: 'Прозрачные тарифы без скрытых платежей и неожиданных доплат при получении авто.',
  },
  {
    icon: 'clock',
    title: 'Быстрая подача',
    description: 'Доставим автомобиль в удобное для вас место уже через 30 минут после оформления.',
  },
  {
    icon: 'car',
    title: 'Современный автопарк',
    description: 'Только исправные автомобили с актуальным техническим обслуживанием и чистым салоном.',
  },
  {
    icon: 'headset',
    title: 'Поддержка 24/7',
    description: 'Наши менеджеры всегда на связи и готовы помочь в любой ситуации на дороге.',
  },
]

export const CARS = [
  { id: 'avensis06', image: avensisComfort, layout: 'full' as const, badge: 'Toyota Avensis, 2006' },
  { id: 'fit03', image: fitEconomy, layout: 'rect' as const, badge: 'Honda Fit, 2003' },
  { id: 'avensis03', image: avensisDetail, layout: 'square' as const, badge: 'Toyota Avensis, 2003' },
  { id: 'avensis07', image: avensisBusiness, layout: 'square' as const, badge: 'Toyota Avensis, 2007' },
  { id: 'prius06', image: priusHybrid, layout: 'rect' as const, badge: 'Toyota Prius, 2006' },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Алексей К.',
    date: '12 мая 2024',
    text: 'Отличный сервис! Брал машину на выходные, всё прошло быстро и без проблем. Автомобиль был чистый и в отличном состоянии.',
    avatar: 'АК',
  },
  {
    id: 2,
    name: 'Мария С.',
    date: '28 апреля 2024',
    text: 'Удобно, что можно заказать подачу авто к дому. Менеджеры вежливые, условия аренды понятные. Рекомендую!',
    avatar: 'МС',
  },
  {
    id: 3,
    name: 'Дмитрий В.',
    date: '15 апреля 2024',
    text: 'Арендовал авто для деловой поездки. Всё чётко, без лишней бюрократии. Цены адекватные, буду обращаться ещё.',
    avatar: 'ДВ',
  },
  {
    id: 4,
    name: 'Елена П.',
    date: '3 апреля 2024',
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
