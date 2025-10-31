import styled from 'styled-components'
import { colours, spacing } from '../../theme'

interface StyledLinkProps {
  $bold?: boolean
  $center?: boolean
  $dark?: boolean
  $fontSize?: string
}

export const Link = styled.a<StyledLinkProps>`
  ${({ $dark }) =>
    $dark ? `color: ${colours.black};` : `color: ${colours.white};`}
  ${({ $center }) => $center && 'text-align: center; display: block;'}
  ${({ $bold }) => $bold && 'font-weight: bold;'}
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize};`}
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    text-decoration: underline;
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  &:visited {
    ${({ $dark }) =>
      $dark ? `color: ${colours.black};` : `color: ${colours.white};`}
  }
`
