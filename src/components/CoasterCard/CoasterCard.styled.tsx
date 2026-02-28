import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const DesktopLayout = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CoasterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.small};
  gap: ${spacing.medium};
`;

export const CoasterTitle = styled.div`
  flex: 1;
`;

export const RankBadge = styled.div`
  background: ${colours.blue};
  color: ${colours.white};
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.small};
  font-weight: bold;
  font-size: ${fonts.small};
  text-align: center;
  min-width: 40px;
`;

export const CoasterActions = styled.div`
  display: flex;
  gap: ${spacing.small};
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
  }
`;

export const CoasterDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.small};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${spacing.small};
  }
`;

export const CoasterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: ${spacing.tiny};
    align-items: start;
    padding: 0;
    margin-bottom: ${spacing.tiny};

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`;

export const FieldLabel = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.mediumGrey};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ClickableFieldValue = styled.button`
  background: none;
  border: none;
  padding: ${spacing.tiny};
  margin: -${spacing.tiny};
  font-size: ${fonts.body};
  color: ${colours.charcoal};
  cursor: pointer;
  text-align: left;
  border-radius: ${spacing.micro};
  word-break: break-word;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colours.paleGrey};
    color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
`;

export const MobileLayout = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
