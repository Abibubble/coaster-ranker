import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const Instructions = styled.div`
  margin-bottom: ${spacing.large};

  p {
    line-height: 1.6;
  }
`

export const CurrentDataInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  color: ${colours.charcoal};
  font-size: ${fonts.small};
`

export const UploadOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.medium};
  margin: ${spacing.large} 0;
`

export const UploadButton = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: ${colours.white};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.medium};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${colours.blue};
    box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
    transform: translateY(-${spacing.mini});
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  h3 {
    margin: ${spacing.small} 0 ${spacing.tiny};
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
