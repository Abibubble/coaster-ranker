import { spacing, fonts, textSpacing } from '../../theme'
import styled from 'styled-components'

export const DuplicateContainer = styled.div`
  background: #fff3cd;
  border: ${spacing.micro} solid #ffc107;
  border-radius: ${spacing.tiny};
  padding: ${textSpacing.small};
  margin: ${textSpacing.small} 0;
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const DuplicateHeader = styled.div`
  margin-bottom: ${textSpacing.small};
`

export const DuplicateTitle = styled.h3`
  color: #856404;
  margin: 0 0 ${textSpacing.tiny} 0;
  font-size: ${fonts.large};
`

export const DuplicateDescription = styled.p`
  color: #856404;
  margin: 0;
  font-size: ${fonts.small};
`

export const DuplicateItem = styled.div`
  background: #ffffff;
  border: ${spacing.micro} solid #ffc107;
  border-radius: ${spacing.tiny};
  padding: ${textSpacing.small};
  margin: ${textSpacing.small} 0;

  @media (max-width: 768px) {
    padding: ${textSpacing.tiny};
    margin: ${textSpacing.tiny} 0;
  }
`

export const CoasterComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${textSpacing.small};
  align-items: start;
  margin: ${textSpacing.small} 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${textSpacing.tiny};
  }
`

export const CoasterCard = styled.div`
  background: #f8f9fa;
  border: ${spacing.micro} solid #dee2e6;
  border-radius: ${spacing.fine};
  padding: ${textSpacing.small};
`

export const CoasterTitle = styled.h4`
  margin: 0 0 ${textSpacing.tiny} 0;
  font-size: ${fonts.body};
  color: #333;
`

export const CoasterDetails = styled.div`
  font-size: ${fonts.small};
  color: #666;

  p {
    margin: ${textSpacing.fine} 0;
  }
`

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #856404;

  @media (max-width: 768px) {
    display: none;
  }
`

export const MatchInfo = styled.div`
  background: #e7f3ff;
  border: ${spacing.micro} solid #007bff;
  border-radius: ${spacing.fine};
  padding: ${textSpacing.tiny};
  margin: ${textSpacing.small} 0;
  font-size: ${fonts.small};

  strong {
    color: #0056b3;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${textSpacing.tiny};
  margin-top: 1rem;
  flex-wrap: wrap;
`

export const DuplicateButton = styled.button<{
  variant: 'existing' | 'new' | 'both'
}>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'existing':
        return `
          background: #dc3545;
          color: white;
          &:hover {
            background: #c82333;
          }
        `
      case 'new':
        return `
          background: #28a745;
          color: white;
          &:hover {
            background: #218838;
          }
        `
      case 'both':
        return `
          background: #007bff;
          color: white;
          &:hover {
            background: #0056b3;
          }
        `
    }
  }}
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`

export const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${props =>
    props.primary
      ? `
    background: #007bff;
    color: white;
    &:hover {
      background: #0056b3;
    }
  `
      : `
    background: #6c757d;
    color: white;
    &:hover {
      background: #5a6268;
    }
  `}
`
