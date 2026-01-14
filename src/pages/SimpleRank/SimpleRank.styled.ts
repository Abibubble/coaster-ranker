import styled from "styled-components";
import { colours, breakpoints } from "../../theme";

export const ComparisonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CoasterCard = styled.div`
  flex: 1;
  max-width: 300px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
  }
`;

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    transform: rotate(90deg);
    padding: 1rem 0;
  }
`;

export const ProgressContainer = styled.div`
  margin: 1rem 0 2rem 0;
  text-align: center;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colours.lightGrey};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
  height: 100%;
  background-color: ${colours.blue};
  transition: width 0.3s ease;
`;

export const RankingList = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const RankingItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${colours.white};
  border: 1px solid ${colours.lightGrey};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;
