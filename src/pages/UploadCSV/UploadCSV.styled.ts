import styled from 'styled-components'
import { Link } from '../../components'
import { colours, spacing, fonts } from '../../theme'

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
    margin: ${spacing.small} 0 ${spacing.tiny} 0;
    font-size: ${fonts.body};
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
    props.$disabled ? colours.lightGrey : colours.blue};
  color: ${colours.white};
  padding: ${spacing.small} ${spacing.large};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  cursor: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props: { $disabled?: boolean }) =>
      props.$disabled ? colours.lightGrey : colours.darkBlue};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }
`

export const FileInfo = styled.p`
  color: ${colours.mutedGrey};
  font-size: ${fonts.small};
  margin-top: ${spacing.tiny};
  text-align: center;
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

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: ${spacing.large};
  color: ${colours.blue};
  text-decoration: none;
  font-size: ${fonts.small};

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
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

export const BoldText = styled.span`
  font-weight: bold;
  color: ${colours.blue};
`
