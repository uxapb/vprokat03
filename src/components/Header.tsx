import { PhoneOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import logo from '../assets/logo.png'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from '../constants/content'
import './Header.css'
export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img className="header__logo-image" src={logo} alt="впрокат" />
        </a>
        <nav className="header__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header__nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          type="primary"
          className="header__phone-btn"
          icon={<PhoneOutlined />}
          href={PHONE_HREF}
        >
          {PHONE_DISPLAY}
        </Button>
      </div>
    </header>
  )
}
