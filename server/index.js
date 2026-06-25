import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3001

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

const VK_ACCESS_TOKEN = process.env.VK_ACCESS_TOKEN
const VK_PEER_ID = process.env.VK_PEER_ID || process.env.VK_USER_ID
const VK_API_VERSION = process.env.VK_API_VERSION || '5.199'

const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const BOOKING_EMAIL_TO = process.env.BOOKING_EMAIL_TO

const emailEnabled = Boolean(SMTP_USER && SMTP_PASS && BOOKING_EMAIL_TO)
const telegramEnabled = Boolean(TOKEN && CHAT_ID)
const vkEnabled = Boolean(VK_ACCESS_TOKEN && VK_PEER_ID)

const mailTransporter = emailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.yandex.ru',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim())
  : true

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

function formatMessage(data) {
  return [
    'Новая заявка на бронирование',
    '',
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Когда и на сколько суток: ${data.dates}`,
    `Выезд за пределы города: ${data.travelOutsideCity}`,
    `Стаж вождения: ${data.drivingExperience}`,
    ...(data.comment ? [`Комментарий: ${data.comment}`] : []),
  ].join('\n')
}

function formatHtml(data) {
  return `
    <h2>Новая заявка на бронирование</h2>
    <p><strong>Имя:</strong> ${data.name}</p>
    <p><strong>Телефон:</strong> ${data.phone}</p>
    <p><strong>Когда и на сколько суток:</strong> ${data.dates}</p>
    <p><strong>Выезд за пределы города:</strong> ${data.travelOutsideCity}</p>
    <p><strong>Стаж вождения:</strong> ${data.drivingExperience}</p>
    ${data.comment ? `<p><strong>Комментарий:</strong> ${data.comment}</p>` : ''}
  `
}

async function sendEmail(data) {
  await mailTransporter.sendMail({
    from: process.env.SMTP_FROM || SMTP_USER,
    to: BOOKING_EMAIL_TO,
    subject: `Заявка на аренду — ${data.name}`,
    text: formatMessage(data),
    html: formatHtml(data),
  })
}

async function sendTelegram(data) {
  const text = [
    '🚗 Новая заявка на бронирование',
    '',
    `👤 Имя: ${data.name}`,
    `📞 Телефон: ${data.phone}`,
    `📅 Когда и на сколько суток: ${data.dates}`,
    `🏙 Выезд за пределы города: ${data.travelOutsideCity}`,
    `🪪 Стаж вождения: ${data.drivingExperience}`,
    ...(data.comment ? [`💬 Комментарий: ${data.comment}`] : []),
  ].join('\n')

  const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.description ?? 'Не удалось отправить в Telegram')
  }
}

async function sendVk(data) {
  const params = new URLSearchParams({
    access_token: VK_ACCESS_TOKEN,
    v: VK_API_VERSION,
    peer_id: VK_PEER_ID,
    message: formatMessage(data),
    random_id: String(Math.floor(Math.random() * 2147483647)),
  })

  const response = await fetch('https://api.vk.com/method/messages.send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  const result = await response.json()
  if (result.error) {
    throw new Error(result.error.error_msg ?? 'Не удалось отправить во VK')
  }
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    email: emailEnabled,
    telegram: telegramEnabled,
    vk: vkEnabled,
  })
})

app.post('/api/booking', async (req, res) => {
  if (!emailEnabled && !telegramEnabled && !vkEnabled) {
    return res.status(500).json({
      error: 'Сервер не настроен: укажите SMTP, VK или Telegram в переменных окружения',
    })
  }

  const { name, phone, dates, travelOutsideCity, drivingExperience, comment } = req.body ?? {}

  if (!name || !phone || !dates || !travelOutsideCity || !drivingExperience) {
    return res.status(400).json({ error: 'Заполните все поля' })
  }

  const data = { name, phone, dates, travelOutsideCity, drivingExperience, comment: comment || '' }
  const errors = []

  if (emailEnabled) {
    try {
      await sendEmail(data)
    } catch (error) {
      console.error('Email error:', error)
      errors.push('email')
    }
  }

  if (telegramEnabled) {
    try {
      await sendTelegram(data)
    } catch (error) {
      console.error('Telegram error:', error)
      errors.push('telegram')
    }
  }

  if (vkEnabled) {
    try {
      await sendVk(data)
    } catch (error) {
      console.error('VK error:', error)
      errors.push('vk')
    }
  }

  const emailOk = !emailEnabled || !errors.includes('email')
  const telegramOk = !telegramEnabled || !errors.includes('telegram')
  const vkOk = !vkEnabled || !errors.includes('vk')

  if (!emailOk && !telegramOk && !vkOk) {
    return res.status(502).json({ error: 'Не удалось отправить заявку' })
  }

  if (errors.length > 0) {
    return res.json({ ok: true, partial: true, failed: errors })
  }

  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`vprokat-api listening on port ${PORT}`)
  console.log(
    `Email: ${emailEnabled ? 'on' : 'off'}, Telegram: ${telegramEnabled ? 'on' : 'off'}, VK: ${vkEnabled ? 'on' : 'off'}`,
  )
})
