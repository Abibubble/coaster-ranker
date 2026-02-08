import styled from "styled-components";
import { colours, spacing, fonts } from "../../theme";

export const Container = styled.div`
  margin-bottom: ${spacing.medium};
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TabGroup = styled.div`
  display: flex;
  box-shadow: 0 ${spacing.micro} 3px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 400px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? colours.darkBlue : colours.white)};
  color: ${({ active }) => (active ? colours.white : colours.charcoal)};
  border: ${spacing.micro} solid ${colours.lightGrey};
  border-left: none;
  padding: ${spacing.small} ${spacing.medium};
  font-size: ${fonts.small};
  font-weight: ${({ active }) => (active ? "700" : "400")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  flex: 1;
  white-space: nowrap;
  border-radius: 0;

  &:first-child {
    border-left: ${spacing.micro} solid ${colours.lightGrey};
    border-radius: ${spacing.tiny} 0 0 ${spacing.tiny};
  }

  &:nth-child(2) {
    border-radius: 0 ${spacing.tiny} ${spacing.tiny} 0;
  }

  &:hover {
    background: ${({ active }) =>
      active ? colours.darkBlue : colours.veryLightGrey};
    color: ${({ active }) => (active ? colours.white : colours.darkBlue)};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.darkBlue};
    outline-offset: ${spacing.mini};
  }

  &:active {
    transform: translateY(${spacing.micro});
  }
`;
