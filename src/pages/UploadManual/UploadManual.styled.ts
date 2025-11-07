import styled, { css } from 'styled-components'
import { colours, fonts, spacing, breakpoints } from '../../theme'
import { Text } from '../../components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  margin-bottom: ${spacing.medium};

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacing.large};
  }
`

export const FormTitle = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['colour', 'mb']
    return !customProps.includes(prop)
  },
})`
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
  padding-bottom: ${spacing.tiny};
`

export const FormRow = styled.div`
  display: grid;
  gap: ${spacing.small};
  margin-bottom: ${spacing.small};
  grid-template-columns: 1fr;

  > div {
    margin-bottom: 0;
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  margin-bottom: ${spacing.small};
`

const baseFormControlStyles = css`
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.fine};
  background-color: ${colours.white};
  box-sizing: border-box;
  min-height: ${spacing.tapTarget};
  width: 100%;
  padding: ${spacing.tiny} ${spacing.small};
  font-size: ${fonts.small};

  @media (min-width: ${breakpoints.mobileSmall}) {
    padding: ${spacing.small};
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
  }

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
