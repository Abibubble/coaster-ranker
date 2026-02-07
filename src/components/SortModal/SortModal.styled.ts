import styled from "styled-components";
import { colours, fonts, spacing } from "../../theme";

export const SortOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  margin-bottom: ${spacing.large};
`;

export const SortOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.small} ${spacing.medium};
  background-color: ${({ $isActive }) =>
    $isActive ? colours.veryLightBlue : "transparent"};
  border: ${spacing.micro} solid
    ${({ $isActive }) => ($isActive ? colours.blue : colours.borderGrey)};
  border-radius: ${spacing.tiny};
  cursor: pointer;
  font-size: ${fonts.medium};
  color: ${colours.charcoal};
  text-align: left;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? colours.veryLightBlue : colours.veryLightGrey};
    border-color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SortOptionLabel = styled.span`
  display: block;
`;

export const CheckIcon = styled.span`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23007acc' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  flex-shrink: 0;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.medium};
  padding-top: ${spacing.medium};
  border-top: ${spacing.micro} solid ${colours.borderGrey};
`;
