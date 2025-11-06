import styled from 'styled-components'
import { colours, fonts, shadows, spacing } from '../../theme'
import { Text } from '../../components'

export const Section = styled.div`
  margin-bottom: ${spacing.large};

  p {
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.small};
  }
`

export const RequiredFields = styled.div`
  margin: ${spacing.large} 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${spacing.tiny} 0;
    line-height: 1.5;
    position: relative;
    padding-left: ${spacing.large};

    &::before {
      content: '✓';
      color: ${colours.green};
      font-weight: bold;
      font-size: ${fonts.body};
      position: absolute;
      left: 0;
      top: ${spacing.tiny};
    }

    span {
      margin-right: ${spacing.tiny};
    }
  }
`

export const ExampleFiles = styled.div`
  margin: ${spacing.large} 0;

  details {
    border: ${spacing.micro} solid ${colours.borderGrey};
    border-radius: ${spacing.tiny};
    padding: ${spacing.small};
    background-color: ${colours.veryLightGrey};
  }

  summary {
    cursor: pointer;
    padding: ${spacing.tiny} 0;
    margin-bottom: 0;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      color: ${colours.orange};
      font-size: ${fonts.small};
      margin-right: ${spacing.tiny};
      transition: transform 0.2s ease;
    }
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }
`

export const JsonTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${spacing.small};
  border: ${spacing.mini} solid ${colours.lightGrey};
  border-radius: ${spacing.tiny};
  font-family: 'Courier New', monospace;
  font-size: ${fonts.small};
  line-height: 1.4;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: ${shadows.focus};
  }

  &:disabled {
    background-color: ${colours.veryLightGrey};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${colours.mutedGrey};
    font-style: italic;
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacing.large} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: ${spacing.micro};
    background: ${colours.lightGrey};
  }

  span {
    padding: 0 ${spacing.small};
  }
`

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
`

export const FileInput = styled.input`
  display: none;
`

export const FileLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-block;
  background-color: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? colours.lightGrey : colours.orange};
  color: ${colours.white};
  padding: ${spacing.small} ${spacing.large};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  cursor: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props: { $disabled?: boolean }) =>
      props.$disabled ? colours.lightGrey : colours.yellow};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.orange};
    outline-offset: ${spacing.mini};
  }
`

export const CurrentDataInfo = styled(Text).withConfig({
  shouldForwardProp: prop => {
    // Don't forward Text component's custom props to the DOM
    const customProps = [
      'bold',
      'center',
      'colour',
      'fontSize',
      'italic',
      'mb',
      'mt',
    ]
    return !customProps.includes(prop)
  },
})`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
`
