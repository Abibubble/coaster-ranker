import styled from 'styled-components'
import { colours, spacing, breakpoints } from '../../theme'

export const CardContainer = styled.div<{
  $clickable?: boolean
  $variant?: 'default' | 'elevated' | 'outlined'
  $maxWidth?: string
}>`
  max-width: 100%;
  width: 100%;
  padding: ${spacing.small};
  background: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.softGrey};
  border-radius: ${spacing.small};
  text-align: left;
  transition: all 0.2s ease;
  cursor: ${props => (props.$clickable ? 'pointer' : 'default')};
  box-sizing: border-box;

  @media (min-width: ${breakpoints.mobileSmall}) {
    margin: 0;
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    max-width: ${props => props.$maxWidth || '300px'};
  }

  ${props =>
    props.$variant === 'elevated' &&
    `
    box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
    border: none;
  `}

  ${props =>
    props.$variant === 'outlined' &&
    `
    background: transparent;
    border: ${spacing.mini} solid ${colours.blue};
  `}

  ${props =>
    props.$clickable &&
    `
    &:hover {
      background: ${colours.softGrey};
      border-color: ${colours.blue};
      transform: translateY(-${spacing.mini});
      box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
    }

    &:focus {
      outline: none;
      border-color: ${colours.blue};
      box-shadow: 0 0 0 ${spacing.fine} rgba(0, 123, 255, 0.25);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`

export const CardHeader = styled.div`
  margin-bottom: ${spacing.small};
`

export const CardContent = styled.div`
  color: ${colours.textGrey};
  line-height: 1.5;

  > p:not([class]) {
    margin: ${spacing.fine} 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const CardFooter = styled.div`
  margin-top: ${spacing.small};
  padding-top: ${spacing.small};
  border-top: 1px solid ${colours.borderGrey};
`

export const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  margin-top: ${spacing.small};
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints.mobileLarge}) {
    flex-direction: row;
    gap: ${spacing.small};
  }
`
