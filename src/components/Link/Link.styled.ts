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
  color: ${colours.blue};
  font-size: ${fonts.small};

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${colours.blue};
  }
`

const textStyles = css<StyledLinkProps>`
  ${({ $dark }) =>
    $dark ? `color: ${colours.black};` : `color: ${colours.white};`}

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    text-decoration: underline;
  }

  &:visited {
    ${({ $dark }) =>
      $dark ? `color: ${colours.black};` : `color: ${colours.white};`}
  }
`

export const Link = styled.a<StyledLinkProps>`
  ${({ $center }) => $center && 'text-align: center; display: block;'}
  ${({ $bold }) => $bold && 'font-weight: bold;'}
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize};`}
  text-decoration: none;

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
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
