import styled from 'styled-components'
import { colours, spacing, fonts, breakpoints } from '../../theme'

export const CurrentDataInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
  margin-bottom: ${spacing.small};
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};

  @media (min-width: ${breakpoints.mobileLarge}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${spacing.medium};
  }

  p {
    margin: 0;
    flex: 1;
  }

  a {
    flex-shrink: 0;
    font-size: ${fonts.small};
    padding: ${spacing.tiny} ${spacing.small};
    text-align: center;
    min-width: fit-content;
  }
`
