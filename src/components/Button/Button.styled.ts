import styled from 'styled-components'
import { colours, fonts, shadows, spacing, breakpoints } from '../../theme'

export const Button = styled.button<{
  $variant: 'default' | 'destructive' | 'success' | 'disabled' | 'warning'
}>`
  padding: ${spacing.tiny};
  border: ${spacing.mini} solid transparent;
  border-radius: ${spacing.tiny};
  cursor: pointer;
  font-size: ${fonts.small};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: ${spacing.tapTarget};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colours.white};
  width: auto;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
    padding: ${spacing.small} ${spacing.medium};
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${shadows.medium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.darkGrey};
    box-shadow: 0 0 0 3px ${colours.veryLightGrey};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${shadows.light};
  }

  ${props =>
    props.$variant === 'default' &&
    `
    background: ${colours.blue};

    &:hover {
      background: ${colours.darkBlue};
    }

    &:focus {
      border-color: ${colours.darkBlue};
      box-shadow: ${shadows.focus};
    }
  `}

  ${props =>
    props.$variant === 'destructive' &&
    `
    background: ${colours.red};

    &:hover {
      background: ${colours.darkRed};
    }

    &:focus {
      border-color: ${colours.darkRed};
      box-shadow: 0 0 0 3px ${colours.errorBorder};
    }
  `}

  ${props =>
    props.$variant === 'success' &&
    `
    background: ${colours.green};

    &:hover {
      background: ${colours.successGreen};
    }

    &:focus {
      border-color: ${colours.successGreen};
      box-shadow: 0 0 0 3px ${colours.successBg};
    }
  `}

  ${props =>
    props.$variant === 'disabled' &&
    `
    background: ${colours.mediumGrey};

    &:hover {
      background: ${colours.darkGrey};
    }
  `}

  ${props =>
    props.$variant === 'warning' &&
    `
    background: ${colours.yellow};
    color: ${colours.black};

    &:hover {
      background: ${colours.orange};
    }

    &:focus {
      border-color: ${colours.orange};
      box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.25);
    }
  `}
`
