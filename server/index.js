import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim())
  : true

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

function formatMessage(data) {
  return [
    '🚗 Новая заявка на бронирование',
    '',
    `👤 Имя: ${data.name}`,
    `📞 Телефон: ${data.phone}`,
    `📅 Когда и на сколько суток: ${data.dates}`,
    `📍 Куда поедете: ${data.destination}`,
    `🏙 Выезд за пределы города: ${data.leavingCity}`,
    `🪪 Стаж вождения: ${data.drivingExperience}`,
  ].join('\n')
}

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/booking', async (req, res) => {
  if (!TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Сервер не настроен (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)' })
  }

  const { name, phone, dates, destination, leavingCity, drivingExperience } = req.body ?? {}

  if (!name || !phone || !dates || !destination || !leavingCity || !drivingExperience) {
    return res.status(400).json({ error: 'Заполните все поля' })
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: formatMessage({ name, phone, dates, destination, leavingCity, drivingExperience }),
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      return res.status(502).json({ error: error?.description ?? 'Не удалось отправить в Telegram' })
    }

    res.json({ ok: true })
  } catch {
    res.status(502).json({ error: 'Не удалось связаться с Telegram' })
  }
})

app.listen(PORT, () => {
  console.log(`vprokat-api listening on port ${PORT}`)
})
