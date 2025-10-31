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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
`

export const FormSection = styled.div`
  h3 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.body};
    border-bottom: ${spacing.micro} solid ${colours.borderGrey};
    padding-bottom: ${spacing.tiny};
  }
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.small};
  margin-bottom: ${spacing.small};
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
`

export const Label = styled.label`
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  font-weight: 600;
`

export const Input = styled.input`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  background-color: ${colours.white};

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 ${spacing.mini} ${colours.shadowLight};
  }

  &::placeholder {
    color: ${colours.mutedGrey};
  }

  &:required {
    border-left: ${spacing.fine} solid ${colours.blue};
  }
`

export const Select = styled.select`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  background-color: ${colours.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 ${spacing.mini} ${colours.shadowLight};
  }

  &:required {
    border-left: ${spacing.fine} solid ${colours.blue};
  }
`

export const SubmitButton = styled.button`
  align-self: flex-start;
  background-color: ${colours.green};
  color: ${colours.white};
  border: none;
  padding: ${spacing.small} ${spacing.large};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colours.darkBlue};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.green};
    outline-offset: ${spacing.mini};
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

export const BoldText = styled.span`
  font-weight: bold;
  color: ${colours.blue};
`
