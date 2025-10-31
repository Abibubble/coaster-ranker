import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const ViewLink = styled.a`
  display: inline-block;
  background-color: ${colours.blue};
  color: ${colours.white};
  font-size: ${fonts.small};
  font-weight: bold;
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.fine};
  text-decoration: none;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background-color: ${colours.darkBlue};
    color: ${colours.white};
    text-decoration: none;
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
    color: ${colours.white};
  }

  &:visited {
    color: ${colours.white};
    background-color: ${colours.blue};
  }

  &:link {
    color: ${colours.white};
    background-color: ${colours.blue};
  }
`
