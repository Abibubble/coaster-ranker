import styled from 'styled-components'
import { colours, spacing, breakpoints } from '../../theme'

export const ContentContainer = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: 0 ${spacing.tiny};
  background: ${colours.white};
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: 0 ${spacing.small};
  }

  @media (min-width: ${breakpoints.desktopLarge}) {
    max-width: 1140px;
  }

  @media (max-width: ${parseInt(breakpoints.desktopLarge) - 1}px) {
    max-width: 95%;
  }

  @media (max-width: 320px) {
    padding: 0 ${spacing.tiny};
    max-width: 100%;
  }
`
