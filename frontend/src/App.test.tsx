import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Integration', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /デジタル資産相続ツール/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders accordion sections', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /デジタル資産相続ツール/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /使い方/i }),
    ).toBeInTheDocument()
  })

  it('interacts with accordion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const summary = screen.getByRole('heading', { level: 3, name: /使い方/i })

    // Find the text inside the content. Note: In jsdom, 'details' content is usually always in the DOM.
    // We check if it's identifiable.
    expect(
      screen.getByText(/「データをスキャンする」のボタンから追加できます/i),
    ).toBeInTheDocument()

    // Clicking the summary header (which is inside valid summary)
    await user.click(summary)

    // In a real browser this toggles visibility. In jsdom + react-testing-library,
    // we verified the 'open' attribute logic in the unit test.
    // Here we just ensure no errors occur during interaction on the full page.
  })
})
