import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const SimplifiedItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${spacing.tiny};
  align-items: center;
  padding: ${spacing.small};
  background: ${colours.white};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const SimplifiedRank = styled.div`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.mediumGrey};
  min-width: 40px;
  text-align: center;
`;

export const SimplifiedName = styled.div`
  font-size: ${fonts.body};
  font-weight: bold;
  color: ${colours.charcoal};
  line-height: 1.3;
`;

export const SimplifiedPark = styled.div`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  line-height: 1.2;
  text-align: right;

  @media (max-width: ${breakpoints.mobileLarge}) {
    text-align: left;
  }
`;
