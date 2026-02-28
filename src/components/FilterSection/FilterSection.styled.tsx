import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const FiltersSection = styled.div`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.medium};
  background-color: ${colours.veryLightGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.borderGrey};
`;

export const FilterHeading = styled.h3`
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const FilterToggle = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: ${fonts.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  cursor: pointer;
  line-height: 1;
  min-height: auto;

  &:hover {
    color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const FilterIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-block;
  width: 12px;
  height: 8px;
  margin-left: ${spacing.tiny};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const FilterContent = styled.div<{ $isOpen: boolean }>`
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.medium};
  margin: ${spacing.medium} 0;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
`;

export const FilterLabel = styled.label`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.charcoal};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterSelect = styled.select`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  background-color: ${colours.white};
  color: ${colours.charcoal};
  font-size: ${fonts.body};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px ${colours.shadowLight};
  min-height: ${spacing.tapTarget};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${spacing.small} center;
  background-size: 12px;
  padding-right: ${spacing.large};

  &:hover {
    border-color: ${colours.blue};
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.blue}20;
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
  }
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.small};
`;
