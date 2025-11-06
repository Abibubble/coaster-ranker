import styled from 'styled-components'
import { colours, spacing, breakpoints, fonts } from '../../theme'
import { Text } from '../Text'

export const FooterContainer = styled.footer`
  background-color: ${colours.black};
  padding: ${spacing.medium};
  margin-top: auto;
`

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.medium};

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${spacing.large};
  }
`

export const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.small};
  justify-content: center;

  @media (min-width: ${breakpoints.tablet}) {
    justify-content: flex-start;
    gap: ${spacing.medium};
  }

  a {
    color: ${colours.lightGrey};
    text-decoration: none;
    font-size: ${fonts.small};
    font-weight: 400;
    padding: ${spacing.tiny} ${spacing.small};
    border-radius: ${spacing.fine};
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover,
    &:focus {
      color: ${colours.white};
      background-color: ${colours.darkGrey};
      transform: translateY(-1px);
    }

    &:focus {
      outline: ${spacing.mini} solid ${colours.lightBlue};
      outline-offset: ${spacing.mini};
    }

    &:active {
      transform: translateY(0);
    }
  }
`

export const CopyrightText = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['colour', 'fontSize']
    return !customProps.includes(prop)
  },
})`
  color: ${colours.white};
  font-weight: 300;
  text-align: center;

  @media (min-width: ${breakpoints.tablet}) {
    text-align: right;
  }
`
