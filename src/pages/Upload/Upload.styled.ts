import styled from 'styled-components'
import { colours, fonts, spacing, breakpoints } from '../../theme'

export const Instructions = styled.div`
  margin-bottom: ${spacing.medium};

  p {
    line-height: 1.6;
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacing.large};
  }
`

export const UploadOptions = styled.div`
  display: grid;
  gap: ${spacing.medium};
  margin: ${spacing.medium} 0;
  grid-template-columns: 1fr;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.large};
  }
`

export const UploadButton = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: ${colours.white};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  padding: ${spacing.small};
  margin: 0 ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileSmall}) {
    margin: 0;
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium};
  }

  &:hover {
    border-color: ${colours.blue};
    box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
    transform: translateY(-${spacing.mini});
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  p {
    margin: 0;
    line-height: 1.4;
  }
`

export const UploadIcon = styled.div`
  background-color: ${colours.blue};
  color: ${colours.white};
  font-size: ${fonts.small};
  font-weight: bold;
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.fine};
  margin-bottom: ${spacing.small};
  text-align: center;
  letter-spacing: ${spacing.micro};
  pointer-events: none;
`
