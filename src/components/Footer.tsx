import { NAV_LINKS, FOOTER_SERVICES, PHONE_DISPLAY, PHONE_HREF } from '../constants/content'
import './Footer.css'

export function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="container footer__inner">
        <div className="footer__col footer__col--brand">
          <a href="#" className="footer__logo">
            <span className="footer__logo-icon">🚗</span>
            <span>впрокат</span>
          </a>
          <p className="footer__desc">
            Аренда автомобилей в Улан-Удэ. Современный автопарк, честные условия и высокий уровень
            сервиса.
          </p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="ВКонтакте">
              VK
            </a>
            <a href="#" className="footer__social-link" aria-label="Telegram">
              TG
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Навигация</h4>
          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col" id="conditions">
          <h4 className="footer__heading">Услуги</h4>
          <ul className="footer__links">
            {FOOTER_SERVICES.map((service) => (
              <li key={service}>
                <a href="#">{service}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Контакты</h4>
          <ul className="footer__contacts">
            <li>
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href="mailto:info@vprokat.ru">info@vprokat.ru</a>
            </li>
            <li>г. Улан-Удэ, ул. Ленина, 12</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} впрокат. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
