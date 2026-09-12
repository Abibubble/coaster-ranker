import styled, { css } from 'styled-components'
import { colours, spacing, fonts } from '../../theme'

interface StyledLinkProps {
  $bold?: boolean
  $center?: boolean
  $dark?: boolean
  $fontSize?: string
  $variant?: 'text' | 'button' | 'back'
}

const buttonStyles = css`
  display: inline-block;
  background-color: ${colours.blue};
  color: ${colours.white};
  padding: ${spacing.tiny};
  border-radius: ${spacing.tiny};
  font-weight: bold;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${colours.darkBlue};
    color: ${colours.white};
    text-decoration: none;
  }

  &:focus {
    color: ${colours.white};
    text-decoration: none;
  }

  &:visited {
    color: ${colours.white};
    background-color: ${colours.blue};
  }

  &:link {
    color: ${colours.white};
    background-color: ${colours.blue};
  }

  &:active {
    transform: translateY(1px);
  }
`

const backStyles = css`
  display: inline-block;
  margin-top: ${spacing.medium};
  color: ${colours.accentText};
  font-size: ${fonts.small};
  text-decoration: underline;

  &:visited {
    color: ${colours.accentText};
  }
`

const textStyles = css<StyledLinkProps>`
  ${({ $dark }) =>
    $dark ? `color: ${colours.charcoal};` : `color: ${colours.white};`}
  text-decoration: underline;

  &:visited {
    ${({ $dark }) =>
      $dark ? `color: ${colours.charcoal};` : `color: ${colours.white};`}
  }
`

export const Link = styled.a<StyledLinkProps>`
  ${({ $center }) => $center && 'text-align: center; display: block;'}
  ${({ $bold }) => $bold && 'font-weight: bold;'}
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize};`}
  text-decoration: none;

  &:focus {
    outline: ${spacing.mini} solid ${colours.accentText};
    outline-offset: ${spacing.mini};
  }

  /* Header/footer are theme-invariant dark chrome, so accentText's light-mode
     value (tuned for page surfaces) is too dark to read against them. Chrome
     never changes appearance between themes, so a fixed white outline always
     works there instead. */
  header &:focus,
  footer &:focus {
    outline-color: ${colours.white};
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'button':
        return buttonStyles
      case 'back':
        return backStyles
      default:
        return textStyles
    }
  }}
`
