import styled from "styled-components";
import { breakpoints, colours, spacing } from "../../theme";

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
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: ${spacing.tiny} ${spacing.small};

  @media (min-width: ${breakpoints.mobileSmall}) {
    padding: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    padding: 0;
    flex: 0 0 auto;
  }

  a {
    text-decoration: none;
    color: ${colours.white};
    padding: ${spacing.tiny};
    border-radius: ${spacing.fine};
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    min-height: ${spacing.tapTarget};

    &:hover,
    &:focus {
      background-color: ${colours.darkGrey};
      text-decoration: underline;
    }

    &:focus {
      outline: ${spacing.mini} solid ${colours.blue};
      outline-offset: ${spacing.mini};
    }

    p {
      margin: 0;
      font-weight: bold;
      line-height: 1.2;
      overflow-wrap: break-word;
    }
  }
`;

export const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${spacing.fine};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${spacing.tiny};
  border-radius: ${spacing.fine};
  transition: background-color 0.2s ease;
  min-height: ${spacing.tapTarget};
  min-width: ${spacing.tapTarget};
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colours.darkGrey};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: none;
  }
`;

export const BurgerLine = styled.div<{ $isOpen: boolean }>`
  width: ${spacing.medium};
  height: ${spacing.fine};
  background-color: ${colours.white};
  transition: all 0.3s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(45deg) translate(6px, 6px)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${(props) => (props.$isOpen ? "0" : "1")};
  }

  &:nth-child(3) {
    transform: ${(props) =>
      props.$isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none"};
  }
`;

export const NavContainer = styled.nav<{ $isOpen: boolean }>`
  overflow: hidden;

  @media (max-width: ${parseInt(breakpoints.tabletLarge) - 1}px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    border-top: ${spacing.micro} solid ${colours.darkGrey};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    display: block;
    flex: 1;
  }
`;

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
      border-bottom: ${spacing.micro} solid ${colours.darkGrey};
    }
  }

  @media (min-width: ${breakpoints.mobileMedium}) and (max-width: ${parseInt(
      breakpoints.tabletLarge,
    ) - 1}px) {
    grid-template-columns: repeat(2, 1fr);

    li {
      border-bottom: ${spacing.micro} solid ${colours.darkGrey};
    }

    li:nth-child(odd) {
      border-right: ${spacing.micro} solid ${colours.darkGrey};
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
      padding: ${spacing.small} ${spacing.tiny};
      line-height: 1.2;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      height: auto;
      width: auto;
      min-width: ${spacing.tapTarget};
      min-height: ${spacing.tapTarget};

      &:hover,
      &:focus {
        background-color: ${colours.darkGrey};
        text-decoration: underline;
        border-radius: ${spacing.fine};
      }
    }
  }
`;
