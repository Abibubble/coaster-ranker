import styled from 'styled-components'
import { spacing, colours, breakpoints } from '../../theme'

export const HeaderContainer = styled.header`
  background-color: ${colours.black};
  color: ${colours.white};
  overflow: hidden;
  contain: layout;
  position: relative;

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: ${spacing.giant};
    padding: 0 ${spacing.medium};
  }
`

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.small};
  text-align: left;

  a {
    text-decoration: none;
    color: ${colours.white};
    padding: ${spacing.tiny};
    border-radius: ${spacing.fine};
    transition: background-color 0.2s ease;

    &:hover,
    &:focus {
      background-color: ${colours.darkGrey};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${colours.blue};
      outline-offset: 2px;
    }

    p {
      margin: 0;
      font-weight: bold;
      line-height: 1.2;
    }
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    padding: 0;
    flex: 0 0 auto;
  }
`

export const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing.tiny};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colours.darkGrey};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: none;
  }
`

export const BurgerLine = styled.div<{ $isOpen: boolean }>`
  width: 25px;
  height: 3px;
  background-color: ${colours.white};
  transition: all 0.3s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${props =>
      props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
  }

  &:nth-child(2) {
    opacity: ${props => (props.$isOpen ? '0' : '1')};
  }

  &:nth-child(3) {
    transform: ${props =>
      props.$isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }
`

export const NavContainer = styled.nav<{ $isOpen: boolean }>`
  overflow: hidden;

  @media (max-width: ${parseInt(breakpoints.tabletLarge) - 1}px) {
    display: ${props => (props.$isOpen ? 'block' : 'none')};
    border-top: 1px solid ${colours.darkGrey};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: block;
    flex: 1;
  }
`

export const NavLinks = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  li {
    box-sizing: border-box;
  }

  li a {
    display: block;
    width: 100%;
    height: 100%;
    padding: ${spacing.small};
    text-decoration: none;
    color: ${colours.white};
    transition: background-color 0.2s ease;
    box-sizing: border-box;

    &:hover,
    &:focus {
      background-color: ${colours.darkGrey};
      text-decoration: underline;
      border-radius: ${spacing.fine};
    }
  }

  @media (max-width: ${parseInt(breakpoints.tabletLarge) - 1}px) {
    gap: 0;

    li:not(:last-child) {
      border-bottom: 1px solid ${colours.darkGrey};
    }
  }

  @media (min-width: ${breakpoints.mobileMedium}) and (max-width: ${parseInt(
      breakpoints.tabletLarge
    ) - 1}px) {
    grid-template-columns: repeat(2, 1fr);

    li {
      border-bottom: 1px solid ${colours.darkGrey};
    }

    li:nth-child(odd) {
      border-right: 1px solid ${colours.darkGrey};
    }
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: flex;
    justify-content: flex-end;
    gap: ${spacing.medium};
    align-items: center;
    height: 100%;

    li {
      height: auto;
    }

    li a {
      text-align: center;
      padding: ${spacing.small} ${spacing.medium};
      line-height: 1.2;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      height: auto;
      width: auto;

      &:hover,
      &:focus {
        background-color: ${colours.darkGrey};
        text-decoration: underline;
        border-radius: 4px;
      }
    }
  }
`
