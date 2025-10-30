import styled from 'styled-components'
import { fonts, spacing, colours, breakpoints } from '../../theme'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: ${spacing.micro} solid ${colours.lightGrey};
  box-shadow: 0 ${spacing.fine} ${spacing.tiny} ${colours.shadowMedium};
  border-radius: ${spacing.tiny};
  text-align: center;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  padding: ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileLarge}) {
    grid-template-columns: 40% 60%;
    text-align: left;
  }

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 30% 70%;
  }
`

export const Link = styled.a`
  width: 100%;
  display: block;
  box-sizing: border-box;
  min-width: 0;

  & ${Grid}:hover {
    // TODO: Fix the focus styling on this
    box-shadow: 0 ${spacing.tiny} ${spacing.small} ${colours.shadowDark};
  }
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`

export const CardContent = styled.div`
  padding-left: ${spacing.small};
  box-sizing: border-box;
  min-width: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
`

export const Title = styled.h2`
  font-size: ${fonts.body};
  margin-bottom: ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.large};
    margin-bottom: auto;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fonts.huge};
  }
`

export const Location = styled.h3`
  font-size: ${fonts.small};
  font-weight: normal;
  margin-bottom: ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
    margin-bottom: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fonts.large};
    margin-bottom: ${spacing.medium};
  }
`

export const Description = styled.p`
  font-size: ${fonts.body};
  margin-bottom: ${spacing.small};
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.tiny};
  padding-bottom: ${spacing.tiny};
  text-align: center;

  @media (min-width: ${breakpoints.mobileSmall}) {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
`
