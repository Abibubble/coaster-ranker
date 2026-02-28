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

export const EditForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${spacing.small};
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
`;

export const FormLabel = styled.label`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.charcoal};
`;

export const FormInput = styled.input`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  font-size: ${fonts.body};

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.blue}20;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: flex-end;
  margin-top: ${spacing.medium};

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
  }
`;
