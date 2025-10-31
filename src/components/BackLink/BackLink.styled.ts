import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const BackLink = styled.a`
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
