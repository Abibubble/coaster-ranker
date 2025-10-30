import { styled } from 'styled-components'
import { colours, spacing } from '../../theme'

export const SkipLinkStyled = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background-color: ${colours.white};
  color: ${colours.black};
  padding: ${spacing.tiny} ${spacing.small};
  text-decoration: none;
  border-radius: ${spacing.fine};
  z-index: 9999;
  font-weight: bold;

  &:focus {
    position: absolute;
    left: ${spacing.fine};
    top: ${spacing.fine};
    width: auto;
    height: auto;
    overflow: visible;
  }
`
