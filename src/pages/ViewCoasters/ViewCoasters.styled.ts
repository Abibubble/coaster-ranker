import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const SortBadge = styled.span`
  margin-left: ${spacing.small};
  padding: ${spacing.micro} ${spacing.tiny};
  background-color: ${colours.lightBlue};
  color: ${colours.white};
  font-size: ${fonts.small};
  border-radius: ${spacing.micro};
  font-weight: normal;
`;

export const ActionsBar = styled.div`
  display: flex;
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    gap: ${spacing.tiny};
  }
`;

export const HelpText = styled.div`
  margin-bottom: ${spacing.medium};
  text-align: center;
`;

export const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  margin-bottom: ${spacing.medium};
  justify-content: flex-end;

  @media (max-width: ${breakpoints.mobileLarge}) {
    justify-content: center;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.tiny};
  cursor: pointer;
  font-size: ${fonts.small};
  color: ${colours.charcoal};
  user-select: none;

  input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
  }
`;

export const SimplifiedGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  max-width: 1106px;
`;

export const CoastersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
  max-width: 1106px;
`;

export const CoasterCardContainer = styled.div`
  background: ${colours.white};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  padding: ${spacing.medium};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;
