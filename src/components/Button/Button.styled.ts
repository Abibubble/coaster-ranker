import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const Button = styled.button<{
  $variant: 'default' | 'destructive' | 'success' | 'secondary' | 'disabled'
}>`
  padding: ${spacing.small} ${spacing.medium};
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.$variant === 'default' &&
    `
    background: ${colours.blue};
    color: ${colours.white};

    &:hover {
      background: ${colours.darkBlue};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colours.shadowMedium};
    }

    &:focus {
      outline: none;
      border-color: ${colours.darkBlue};
      box-shadow: 0 0 0 3px ${colours.veryLightBlue};
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${colours.shadowMedium};
    }
  `}

  ${props =>
    props.$variant === 'destructive' &&
    `
    background: ${colours.red};
    color: ${colours.white};

    &:hover {
      background: ${colours.darkRed};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colours.shadowMedium};
    }

    &:focus {
      outline: none;
      border-color: ${colours.darkRed};
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${colours.shadowMedium};
    }
  `}

  ${props =>
    props.$variant === 'success' &&
    `
    background: ${colours.green};
    color: ${colours.white};

    &:hover {
      background: ${colours.successGreen};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colours.shadowMedium};
    }

    &:focus {
      outline: none;
      border-color: ${colours.successGreen};
      box-shadow: 0 0 0 3px ${colours.successBg};
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${colours.shadowMedium};
    }
  `}

  ${props =>
    props.$variant === 'secondary' &&
    `
    background: ${colours.mediumGrey};
    color: ${colours.white};

    &:hover {
      background: ${colours.darkGrey};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colours.shadowMedium};
    }

    &:focus {
      outline: none;
      border-color: ${colours.darkGrey};
      box-shadow: 0 0 0 3px ${colours.veryLightGrey};
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${colours.shadowMedium};
    }
  `}

  ${props =>
    props.$variant === 'disabled' &&
    `
    background: ${colours.mediumGrey};
    color: ${colours.white};

    &:hover {
      background: ${colours.darkGrey};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colours.shadowMedium};
    }

    &:focus {
      outline: none;
      border-color: ${colours.darkGrey};
      box-shadow: 0 0 0 3px ${colours.veryLightGrey};
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px ${colours.shadowMedium};
    }
  `}
`
