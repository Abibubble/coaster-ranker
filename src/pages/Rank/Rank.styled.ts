import styled from 'styled-components'

export const RankingContainer = styled.div`
  margin-top: 2rem;
`

export const ComparisonArea = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const CoasterCard = styled.button`
  flex: 1;
  max-width: 300px;
  padding: 1.5rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: #e9ecef;
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`

export const CoasterName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
`

export const CoasterPark = styled.p`
  margin: 0 0 0.75rem 0;
  color: #666;
  font-weight: 500;
`

export const CoasterDetails = styled.div`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #777;

  p {
    margin: 0.25rem 0;
  }
`

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  margin: 0 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    font-size: 1.25rem;
  }
`

export const ProgressInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #007bff;

  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`

export const RankingComplete = styled.div`
  text-align: center;
  padding: 2rem;
  background: #d4edda;
  border-radius: 8px;
  border-left: 4px solid #28a745;

  h3 {
    margin: 0 0 1rem 0;
    color: #155724;
  }

  p {
    margin: 0 0 1rem 0;
    color: #155724;
  }
`

export const RestartButton = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`
