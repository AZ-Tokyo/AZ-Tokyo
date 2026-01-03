import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionSummary, AccordionContent } from './Accordion'

describe('Accordion Component', () => {
  it('renders summary and content', () => {
    render(
      <Accordion>
        <AccordionSummary>Summary Text</AccordionSummary>
        <AccordionContent>Content Text</AccordionContent>
      </Accordion>,
    )

    expect(screen.getByText('Summary Text')).toBeInTheDocument()
    // Content should exist in the DOM (details/summary behavior matches this)
    // Visibility might depend on styles/semantics, but existence is sure.
    expect(screen.getByText('Content Text')).toBeInTheDocument()
  })

  it('toggles attribute on click', async () => {
    const user = userEvent.setup()
    render(
      <Accordion data-testid="accordion">
        <AccordionSummary>Summary Text</AccordionSummary>
        <AccordionContent>Content Text</AccordionContent>
      </Accordion>,
    )

    const accordion = screen.getByTestId('accordion')
    expect(accordion).not.toHaveAttribute('open')

    // Click the summary to open
    await user.click(screen.getByText('Summary Text'))
    expect(accordion).toHaveAttribute('open')

    // Click again to close
    await user.click(screen.getByText('Summary Text'))
    expect(accordion).not.toHaveAttribute('open')
  })
})
