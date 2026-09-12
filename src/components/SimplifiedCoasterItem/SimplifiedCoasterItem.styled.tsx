import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const SimplifiedItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${spacing.tiny};
  align-items: center;
  width: 100%;
  padding: ${spacing.small};
  background: ${colours.surface};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  font-family: inherit;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &[type='button'] {
    cursor: pointer;
  }

  &[type='button']:hover {
    border-color: ${colours.accentText};
  }

  &[type='button']:focus {
    outline: 2px solid ${colours.accentText};
    outline-offset: 2px;
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
