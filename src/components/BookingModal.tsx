import { Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { sendBookingToTelegram } from '../services/telegram'
import type { BookingFormData } from '../services/telegram'
import './BookingModal.css'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [form] = Form.useForm<BookingFormData>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: BookingFormData) => {
    setLoading(true)
    try {
      await sendBookingToTelegram(values)
      message.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
      form.resetFields()
      onClose()
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Ошибка при отправке заявки')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Забронировать авто"
      open={open}
      onCancel={handleCancel}
      footer={null}
      className="booking-modal"
      width={520}
      destroyOnHidden
    >
      <p className="booking-modal__subtitle">
        Заполните форму, и мы свяжемся с вами для подтверждения бронирования.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="booking-modal__form"
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Введите ваше имя' }]}
        >
          <Input placeholder="Как к вам обращаться?" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: 'Введите номер телефона' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dates"
          label="Когда вам нужен авто и на сколько суток?"
          rules={[{ required: true, message: 'Укажите даты и срок аренды' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="travelOutsideCity"
          label="Будете выезжать за пределы города? Если да, то куда?"
          rules={[{ required: true, message: 'Укажите, планируете ли выезд за город' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="drivingExperience"
          label="Какой стаж вождения у водителя?"
          rules={[{ required: true, message: 'Укажите стаж вождения' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="comment" label="Комментарий">
          <Input.TextArea rows={3} placeholder="Дополнительная информация (необязательно)" />
        </Form.Item>

        <Form.Item className="booking-modal__submit">
          <button type="submit" className="booking-modal__btn" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
