import styled from 'styled-components'
import { fonts, colours, spacing } from '../../theme'

export const Subtitle = styled.h2`
  margin: 0;
  padding: 0;
  text-align: center;
  color: ${colours.mediumGrey};

  font-size: ${fonts.body};

  @media (min-width: 768px) {
    font-size: ${fonts.large};
  }
`

export const CollageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  border-radius: ${spacing.tiny};
  margin: 0 auto ${spacing.medium} auto;

  padding: ${spacing.small} ${spacing.tiny};
  min-height: 220px;

  @media (min-width: 768px) {
    padding: ${spacing.medium} ${spacing.small};
    min-height: 420px;
  }

  @media (min-width: 1024px) {
    padding: ${spacing.large} ${spacing.medium};
    min-height: 720px;
    max-width: 1100px;
  }

  @media (max-width: 320px) {
    padding: ${spacing.tiny};
    min-height: 210px;
  }
`
