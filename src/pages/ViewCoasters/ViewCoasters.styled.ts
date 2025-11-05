import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.giant};
`

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.large};
`

export const ActionsBar = styled.div`
  display: flex;
  gap: ${spacing.medium};
  margin-bottom: ${spacing.large};
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
  }
`

export const CoastersTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${spacing.medium};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 2fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1fr)
    minmax(120px, 1fr)
    minmax(100px, 1fr)
    minmax(100px, 1fr);
  background-color: ${colours.veryLightGrey};
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr 100px;
  }
`

export const HeaderCell = styled.div`
  padding: ${spacing.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      display: none;
    }
  }
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 2fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1fr)
    minmax(120px, 1fr)
    minmax(100px, 1fr)
    minmax(100px, 1fr);
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colours.paleGrey};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr 100px;
  }
`

export const TableCell = styled.div`
  padding: ${spacing.medium};
  color: ${colours.slateGrey};
  font-size: ${fonts.body};
  align-self: center;

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      display: none;
    }
  }
`
