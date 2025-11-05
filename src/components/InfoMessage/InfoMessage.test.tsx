import { render, screen } from '@testing-library/react'
import { InfoMessage } from './InfoMessage'
import { Text } from '../Text/Text'

describe('InfoMessage', () => {
  it('renders children correctly', () => {
    render(
      <InfoMessage variant='error'>
        <Text>Test message</Text>
      </InfoMessage>
    )
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders as paragraph element by default', () => {
    render(
      <InfoMessage variant='success'>
        <Text>Success message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Success message').closest('p')
    expect(element).toBeInTheDocument()
  })

  it('applies error variant styling', () => {
    render(
      <InfoMessage variant='error'>
        <Text>Error message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Error message').closest('p')
    expect(element).toHaveStyle('background-color: #fee')
  })

  it('applies success variant styling', () => {
    render(
      <InfoMessage variant='success'>
        <Text>Success message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Success message').closest('p')
    expect(element).toHaveStyle('background-color: #efe')
  })

  it('applies info variant styling', () => {
    render(
      <InfoMessage variant='info'>
        <Text>Info message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Info message').closest('p')
    expect(element).toHaveStyle('background-color: #fff3cd')
  })

  it('applies ARIA attributes correctly', () => {
    render(
      <InfoMessage variant='error' role='alert' aria-live='assertive'>
        <Text>Alert message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Alert message').closest('p')
    expect(element).toHaveAttribute('role', 'alert')
    expect(element).toHaveAttribute('aria-live', 'assertive')
  })

  it('allows custom background color override', () => {
    render(
      <InfoMessage variant='error' bgColour='blue'>
        <Text>Custom color message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Custom color message').closest('p')
    expect(element).toHaveStyle('background-color: #007acc')
  })

  it('allows custom border color override', () => {
    render(
      <InfoMessage variant='error' borderColour='green'>
        <Text>Custom border message</Text>
      </InfoMessage>
    )
    const element = screen.getByText('Custom border message').closest('p')
    expect(element).toHaveStyle('border: 1px solid #1d7231')
  })
})
