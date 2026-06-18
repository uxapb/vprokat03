export interface BookingFormData {
  name: string
  phone: string
  dates: string
  destination: string
  leavingCity: string
  drivingExperience: string
}

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL ?? '/api/booking'

export async function sendBookingToTelegram(data: BookingFormData): Promise<void> {
  const response = await fetch(BOOKING_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.error ?? 'Не удалось отправить заявку')
  }
}
