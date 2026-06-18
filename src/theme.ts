import type { ThemeConfig } from 'antd'

export const colors = {
  yellow: '#FFD600',
  yellowDark: '#E6C200',
  black: '#0A0A0A',
  darkGray: '#1A1A1A',
  textGray: '#666666',
  lightGray: '#F5F5F5',
  white: '#FFFFFF',
}

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.black,
    colorBgContainer: colors.white,
    borderRadius: 10,
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    Button: {
      primaryColor: colors.white,
      colorPrimary: colors.black,
      colorPrimaryHover: '#333333',
      colorPrimaryActive: '#000000',
      borderRadius: 50,
      controlHeight: 48,
      fontWeight: 600,
    },
    Modal: {
      borderRadiusLG: 16,
    },
    Input: {
      borderRadius: 10,
      controlHeight: 48,
    },
  },
}
