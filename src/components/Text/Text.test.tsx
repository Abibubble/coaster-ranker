import { render, screen } from '@testing-library/react'
import { Text } from './Text'
import { colours, fonts, spacing } from '../../theme'

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Hello World</Text>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders with default element and styling', () => {
    render(<Text>Test text</Text>)
    const element = screen.getByText('Test text')
    expect(element.tagName).toBe('SPAN')
    expect(element).toHaveStyle(`color: ${colours.black}`)
    expect(element).toHaveStyle(`font-size: ${fonts.body}`)
  })

  it('renders as specified element when using as prop', () => {
    render(<Text as='p'>Paragraph text</Text>)
    const element = screen.getByText('Paragraph text')
    expect(element.tagName).toBe('P')
  })

  it('applies bold styling when bold prop is true', () => {
    render(<Text bold>Bold text</Text>)
    const element = screen.getByText('Bold text')
    expect(element).toHaveStyle('font-weight: 600')
  })

  it('applies italic styling when italic prop is true', () => {
    render(<Text italic>Italic text</Text>)
    const element = screen.getByText('Italic text')
    expect(element).toHaveStyle('font-style: italic')
  })

  it('applies custom colour when colour prop is provided', () => {
    render(<Text colour='blue'>Blue text</Text>)
    const element = screen.getByText('Blue text')
    expect(element).toHaveStyle(`color: ${colours.blue}`)
  })

  it('applies custom font size when fontSize prop is provided', () => {
    render(<Text fontSize='title'>Title text</Text>)
    const element = screen.getByText('Title text')
    expect(element).toHaveStyle(`font-size: ${fonts.title}`)
  })

  it('applies margin-bottom when mb prop is provided', () => {
    render(<Text mb='small'>Text with margin</Text>)
    const element = screen.getByText('Text with margin')
    expect(element).toHaveStyle(`margin-bottom: ${spacing.small}`)
  })

  it('applies margin-top when mt prop is provided', () => {
    render(<Text mt='small'>Text with top margin</Text>)
    const element = screen.getByText('Text with top margin')
    expect(element).toHaveStyle(`margin-top: ${spacing.small}`)
  })

  it('applies htmlFor attribute when used as label', () => {
    render(
      <Text as='label' htmlFor='test-input'>
        Label text
      </Text>
    )
    const element = screen.getByText('Label text')
    expect(element).toHaveAttribute('for', 'test-input')
    expect(element.tagName).toBe('LABEL')
  })
})
