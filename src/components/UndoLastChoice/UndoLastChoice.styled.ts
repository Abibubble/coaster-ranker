import styled from "styled-components";
import { colours, spacing, breakpoints, fonts, shadows } from "../../theme";
import { Text } from "../Text";

export const UndoContainer = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.small};
  padding: ${spacing.small};
  margin: ${spacing.medium} auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  align-items: flex-start;
  max-width: 768px;
  width: 100%;

  /* Add padding back for mobile */
  padding-left: ${spacing.small};
  padding-right: ${spacing.small};

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding-left: ${spacing.small};
    padding-right: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${spacing.medium};
    padding-left: ${spacing.medium};
    padding-right: ${spacing.medium};
  }
`;

export const LastChoiceInfo = styled.div`
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
`;

export const LastChoiceText = styled(Text)`
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const WinnerName = styled(Text)`
  display: inline;
  margin: 0;
`;

export const UndoButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;

  @media (min-width: ${breakpoints.tablet}) {
    justify-content: flex-end;
  }
`;

export const UndoButton = styled.button`
  padding: ${spacing.tiny} ${spacing.small};
  border: ${spacing.mini} solid transparent;
  border-radius: ${spacing.tiny};
  background-color: ${colours.blue};
  color: ${colours.white};
  font-size: ${fonts.small};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: ${spacing.tapTarget};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
    padding: ${spacing.small} ${spacing.medium};
  }

  &:hover {
    background-color: ${colours.darkBlue};
    transform: translateY(-1px);
    box-shadow: ${shadows.medium};
  }

  &:focus {
    outline: 2px solid ${colours.darkGrey};
    outline-offset: 2px;
    border-color: ${colours.darkGrey};
    box-shadow: 0 0 0 3px ${colours.veryLightGrey};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${shadows.light};
    background-color: ${colours.darkerBlue};
  }

  &:disabled {
    background-color: ${colours.lightGrey};
    color: ${colours.mediumGrey};
    border-color: ${colours.lightGrey};
    cursor: not-allowed;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
