import { render, screen } from '@testing-library/react'
import { Text } from './Text'
import { colours, fonts, spacing } from '../../theme'

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Hello World</Text>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<Text>Test text</Text>)
    const element = screen.getByText('Test text')
    expect(element.tagName).toBe('SPAN')
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

  it('uses black colour by default', () => {
    render(<Text>Default colour</Text>)
    const element = screen.getByText('Default colour')
    expect(element).toHaveStyle(`color: ${colours.black}`)
  })

  it('applies custom colour when colour prop is provided', () => {
    render(<Text colour='blue'>Blue text</Text>)
    const element = screen.getByText('Blue text')
    expect(element).toHaveStyle(`color: ${colours.blue}`)
  })

  it('uses body font size by default', () => {
    render(<Text>Default font size</Text>)
    const element = screen.getByText('Default font size')
    expect(element).toHaveStyle(`font-size: ${fonts.body}`)
  })

  it('applies custom font size when fontSize prop is provided', () => {
    render(<Text fontSize='title'>Title text</Text>)
    const element = screen.getByText('Title text')
    expect(element).toHaveStyle(`font-size: ${fonts.title}`)
  })

  it('applies large font size correctly', () => {
    render(<Text fontSize='large'>Large text</Text>)
    const element = screen.getByText('Large text')
    expect(element).toHaveStyle(`font-size: ${fonts.large}`)
  })

  it('applies small font size correctly', () => {
    render(<Text fontSize='small'>Small text</Text>)
    const element = screen.getByText('Small text')
    expect(element).toHaveStyle(`font-size: ${fonts.small}`)
  })

  it('applies yellow color correctly', () => {
    render(<Text colour='yellow'>Yellow text</Text>)
    const element = screen.getByText('Yellow text')
    expect(element).toHaveStyle(`color: ${colours.yellow}`)
  })

  it('applies green color correctly', () => {
    render(<Text colour='green'>Green text</Text>)
    const element = screen.getByText('Green text')
    expect(element).toHaveStyle(`color: ${colours.green}`)
  })

  it('applies margin-bottom when mb prop is provided', () => {
    render(<Text mb='small'>Text with margin</Text>)
    const element = screen.getByText('Text with margin')
    expect(element).toHaveStyle(`margin-bottom: ${spacing.small}`)
  })

  it('applies large margin-bottom correctly', () => {
    render(<Text mb='large'>Text with large margin</Text>)
    const element = screen.getByText('Text with large margin')
    expect(element).toHaveStyle(`margin-bottom: ${spacing.large}`)
  })

  it('has no margin-bottom by default', () => {
    render(<Text>Default margin text</Text>)
    const element = screen.getByText('Default margin text')
    expect(element).toHaveStyle('margin-bottom: 0')
  })

  it('applies margin-top when mt prop is provided', () => {
    render(<Text mt='small'>Text with top margin</Text>)
    const element = screen.getByText('Text with top margin')
    expect(element).toHaveStyle(`margin-top: ${spacing.small}`)
  })

  it('applies large margin-top correctly', () => {
    render(<Text mt='large'>Text with large top margin</Text>)
    const element = screen.getByText('Text with large top margin')
    expect(element).toHaveStyle(`margin-top: ${spacing.large}`)
  })

  it('has no margin-top by default', () => {
    render(<Text>Default margin text</Text>)
    const element = screen.getByText('Default margin text')
    expect(element).toHaveStyle('margin-top: 0')
  })

  it('applies both mt and mb when both props are provided', () => {
    render(
      <Text mt='small' mb='large'>
        Text with both margins
      </Text>
    )
    const element = screen.getByText('Text with both margins')
    expect(element).toHaveStyle(`margin-top: ${spacing.small}`)
    expect(element).toHaveStyle(`margin-bottom: ${spacing.large}`)
  })

  it('combines multiple style props including fontSize', () => {
    render(
      <Text bold italic colour='red' fontSize='huge'>
        Combined styles
      </Text>
    )
    const element = screen.getByText('Combined styles')
    expect(element).toHaveStyle('font-weight: 600')
    expect(element).toHaveStyle('font-style: italic')
    expect(element).toHaveStyle(`color: ${colours.red}`)
    expect(element).toHaveStyle(`font-size: ${fonts.huge}`)
  })

  it('combines margin-bottom with other style props', () => {
    render(
      <Text bold colour='blue' fontSize='large' mb='medium'>
        Complex styled text
      </Text>
    )
    const element = screen.getByText('Complex styled text')
    expect(element).toHaveStyle('font-weight: 600')
    expect(element).toHaveStyle(`color: ${colours.blue}`)
    expect(element).toHaveStyle(`font-size: ${fonts.large}`)
    expect(element).toHaveStyle(`margin-bottom: ${spacing.medium}`)
  })

  it('combines margin-top with other style props', () => {
    render(
      <Text italic colour='green' fontSize='small' mt='tiny'>
        Complex styled text with top margin
      </Text>
    )
    const element = screen.getByText('Complex styled text with top margin')
    expect(element).toHaveStyle('font-style: italic')
    expect(element).toHaveStyle(`color: ${colours.green}`)
    expect(element).toHaveStyle(`font-size: ${fonts.small}`)
    expect(element).toHaveStyle(`margin-top: ${spacing.tiny}`)
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
