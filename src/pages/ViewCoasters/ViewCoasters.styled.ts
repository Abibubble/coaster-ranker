import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.giant};
`

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.large};
`

export const FiltersSection = styled.div`
  margin-bottom: ${spacing.large};
  padding: ${spacing.medium};
  background-color: ${colours.veryLightGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.borderGrey};
`

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.mobileLarge}) {
    grid-template-columns: 1fr;
  }
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
`

export const FilterLabel = styled.label`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.charcoal};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const FilterSelect = styled.select`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.micro};
  background-color: ${colours.white};
  color: ${colours.charcoal};
  font-size: ${fonts.body};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${colours.slateGrey};
  }

  &:focus {
    outline: none;
    border-color: ${colours.charcoal};
    box-shadow: 0 0 0 2px ${colours.paleGrey};
  }
`

export const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.small};
`

export const TableHelpText = styled.div`
  margin-bottom: ${spacing.medium};
  text-align: center;
`

export const SkipTableLink = styled.a`
  display: inline-block;
  margin-left: ${spacing.medium};
  color: ${colours.blue};
  font-size: ${fonts.small};
  text-decoration: underline;

  &:hover {
    color: ${colours.darkBlue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
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

export const TableHeader = styled.div<{ hasRank?: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasRank }) =>
    hasRank
      ? `minmax(80px, 0.5fr)
         minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`
      : `minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`};
  background-color: ${colours.veryLightGrey};
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: ${({ hasRank }) =>
      hasRank ? '80px 1fr 1fr 100px' : '1fr 1fr 100px'};
  }
`

export const HeaderCell = styled.div<{ isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${breakpoints.tablet}) {
    ${({ isHiddenOnTablet }) =>
      isHiddenOnTablet &&
      `
      display: none;
    `}
  }
`

export const TableRow = styled.div<{ hasRank?: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasRank }) =>
    hasRank
      ? `minmax(80px, 0.5fr)
         minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`
      : `minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`};
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colours.paleGrey};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: ${({ hasRank }) =>
      hasRank ? '80px 1fr 1fr 100px' : '1fr 1fr 100px'};
  }
`

export const TableCell = styled.div<{ isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  color: ${colours.slateGrey};
  font-size: ${fonts.body};
  align-self: center;

  @media (max-width: ${breakpoints.tablet}) {
    ${({ isHiddenOnTablet }) =>
      isHiddenOnTablet &&
      `
      display: none;
    `}
  }
`

export const ClickableTableCell = styled(TableCell)<{
  isHiddenOnTablet?: boolean
}>`
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${spacing.micro};
  position: relative;

  &:hover {
    background-color: ${colours.paleGrey};
    color: ${colours.charcoal};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover::after {
    content: 'filter';
    position: absolute;
    right: ${spacing.small};
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    opacity: 0.6;
    text-transform: uppercase;
    font-weight: bold;
    color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
    background-color: ${colours.paleGrey};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus::after {
    content: 'filter';
    position: absolute;
    right: ${spacing.small};
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    opacity: 0.6;
    text-transform: uppercase;
    font-weight: bold;
    color: ${colours.blue};
  }

  &:active {
    background-color: ${colours.softGrey};
    transform: translateY(0);
  }
`
