import styled from 'styled-components'
import { colours, fonts, shadows, spacing } from '../../theme'

export const Instructions = styled.div`
  margin-bottom: ${spacing.large};

  h2 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.large};
  }

  p {
    line-height: 1.6;
    color: ${colours.mediumGrey};
    margin-bottom: ${spacing.small};
  }
`

export const CurrentDataInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  color: ${colours.charcoal};
  font-size: ${fonts.small};

  strong {
    color: ${colours.blue};
  }
`

export const UploadOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.medium};
  margin: ${spacing.large} 0;
`

export const UploadButton = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: ${colours.white};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.medium};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${colours.blue};
    box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
    transform: translateY(-${spacing.mini});
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  h3 {
    color: ${colours.charcoal};
    margin: ${spacing.small} 0 ${spacing.tiny};
    font-size: ${fonts.body};
  }

  p {
    color: ${colours.mediumGrey};
    margin: 0;
    font-size: ${fonts.small};
    line-height: 1.4;
  }
`

export const UploadIcon = styled.div`
  background-color: ${colours.blue};
  color: ${colours.white};
  font-size: ${fonts.small};
  font-weight: bold;
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.fine};
  margin-bottom: ${spacing.small};
  text-align: center;
  letter-spacing: ${spacing.micro};
  pointer-events: none;
`

export const JsonSection = styled.div`
  margin-bottom: ${spacing.large};

  h3 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.body};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.small};
  }
`

export const JsonExample = styled.div`
  margin-bottom: ${spacing.medium};

  h4 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.tiny};
    font-size: ${fonts.body};
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

export const SubmitButton = styled.button`
  align-self: flex-start;
  background-color: ${colours.blue};
  color: ${colours.white};
  border: none;
  padding: ${spacing.small} ${spacing.large};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${colours.darkBlue};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  &:disabled {
    background-color: ${colours.lightGrey};
    cursor: not-allowed;
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
    color: ${colours.mediumGrey};
    font-style: italic;
  }
`

export const FileSection = styled.div`
  margin-bottom: ${spacing.large};

  h3 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.body};
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

export const RequiredFields = styled.div`
  margin: ${spacing.large} 0;

  h3 {
    color: ${colours.darkBlue};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.body};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${spacing.tiny} 0;
    font-size: ${fonts.body};
    line-height: 1.5;
    position: relative;
    padding-left: ${spacing.large};
    color: ${colours.slateGrey};

    &::before {
      content: '✓';
      color: ${colours.green};
      font-weight: bold;
      font-size: ${fonts.body};
      position: absolute;
      left: 0;
      top: ${spacing.tiny};
    }

    strong {
      color: ${colours.charcoal};
      font-weight: 600;
      margin-right: ${spacing.tiny};
    }
  }
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.tiny};

  span {
    font-size: ${fonts.small};
    line-height: 1.4;
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
    color: ${colours.orange};
    font-size: ${fonts.body};
    font-weight: 600;
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

  h4 {
    color: ${colours.charcoal};
    margin: ${spacing.small} 0 ${spacing.tiny};
    font-size: ${fonts.body};
  }

  h3 {
    color: ${colours.orange};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.body};
  }
`

export const ExampleLinks = styled.div`
  display: flex;
  gap: ${spacing.small};
  flex-wrap: wrap;

  a {
    display: inline-block;
    padding: ${spacing.tiny} ${spacing.small};
    background-color: ${colours.orange};
    color: ${colours.white};
    text-decoration: none;
    border-radius: ${spacing.fine};
    font-size: ${fonts.small};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colours.yellow};
    }

    &:focus {
      outline: ${spacing.mini} solid ${colours.orange};
      outline-offset: ${spacing.mini};
    }
  }
`

export const ErrorMessage = styled.div`
  background-color: ${colours.lightRed};
  border: ${spacing.micro} solid ${colours.redBorder};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  color: ${colours.red};
  display: flex;
  align-items: center;
  gap: ${spacing.tiny};
`

export const ErrorIcon = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.red};
`

export const SuccessMessage = styled.div`
  background-color: ${colours.lightGreenBg};
  border: ${spacing.micro} solid ${colours.greenBorder};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  color: ${colours.green};
  display: flex;
  align-items: center;
  gap: ${spacing.tiny};
`

export const SuccessIcon = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.green};
`

export const BoldText = styled.span`
  font-weight: bold;
  color: ${colours.blue};
`
