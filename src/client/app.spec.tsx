import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('bootstraps', () => {
    const { getByText } = render(<App />)
    getByText('App Template')
  })
})
