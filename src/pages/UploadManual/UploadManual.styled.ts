import styled, { css } from 'styled-components'
import { colours, fonts, spacing } from '../../theme'
import { Text } from '../../components'

export const CurrentDataInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  font-size: ${fonts.small};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.large};
`

export const FormTitle = styled(Text)`
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
  padding-bottom: ${spacing.tiny};
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

const baseFormControlStyles = css`
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

  &:required {
    border-left: ${spacing.fine} solid ${colours.blue};
  }
`

export const Input = styled.input`
  ${baseFormControlStyles}

  &::placeholder {
    color: ${colours.mutedGrey};
  }
`

export const Select = styled.select`
  ${baseFormControlStyles}
  cursor: pointer;
`
