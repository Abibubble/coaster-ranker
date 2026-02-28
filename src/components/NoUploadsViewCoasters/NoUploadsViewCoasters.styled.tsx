import styled from "styled-components";
import { breakpoints, spacing } from "../../theme";

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.medium};

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.large};
  }
`;
