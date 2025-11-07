import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.large};

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.giant};
  }
`

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.medium};
`

export const FiltersSection = styled.div`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.medium};
  background-color: ${colours.veryLightGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.borderGrey};
`

export const FilterHeading = styled.h3`
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`

export const FilterToggle = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: ${fonts.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  cursor: pointer;
  line-height: 1;
  min-height: auto;

  &:hover {
    color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`

export const FilterIcon = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;

  &::after {
    content: '▼';
  }
`

export const FilterContent = styled.div<{ $isOpen: boolean }>`
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
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
  margin-bottom: ${spacing.medium};
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

  @media (max-width: ${breakpoints.tablet}) {
    overflow-x: visible;
    border: none;
  }
`

export const TableHeader = styled.div<{ $hasRank?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasRank }) =>
    $hasRank
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
    display: none;
  }
`

export const HeaderCell = styled.div<{ $isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${breakpoints.tablet}) {
    ${({ $isHiddenOnTablet }) =>
      $isHiddenOnTablet &&
      `
      display: none;
    `}
  }
`

export const TableRow = styled.div<{ $hasRank?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasRank }) =>
    $hasRank
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
    display: block;
    border: ${spacing.micro} solid ${colours.borderGrey};
    border-radius: ${spacing.small};
    padding: ${spacing.small};
    margin-bottom: ${spacing.small};
    background-color: ${colours.white};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: ${colours.white};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transform: none;
    }

    &:last-child {
      border-bottom: ${spacing.micro} solid ${colours.borderGrey};
    }
  }
`

export const TableCell = styled.div<{ $isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  color: ${colours.slateGrey};
  font-size: ${fonts.body};
  align-self: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
    margin-bottom: ${spacing.tiny};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.small};
    align-items: start;

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`

export const ClickableTableCell = styled(TableCell)<{
  $isHiddenOnTablet?: boolean
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

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
    background-color: ${colours.paleGrey};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: ${colours.softGrey};
    transform: translateY(0);
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
    margin-bottom: ${spacing.tiny};
    border-radius: ${spacing.small};
    background-color: transparent;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.small};
    align-items: start;

    &:hover {
      background-color: transparent;
      transform: none;
      box-shadow: none;
    }

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      background-color: transparent;
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`

export const MobileFieldLabel = styled.span`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    font-size: ${fonts.small};
    font-weight: bold;
    color: ${colours.charcoal};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    justify-self: start;
    align-self: center;
  }
`

export const MobileFieldValue = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    font-size: ${fonts.body};
    color: ${colours.slateGrey};
    justify-self: start;
    align-self: center;
  }
`

export const MobileFieldValueClickable = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    font-size: ${fonts.body};
    color: ${colours.slateGrey};
    justify-self: start;
    align-self: center;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${colours.blue};
    }
  }
`

export const MobileRankCell = styled(TableCell)`
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
    margin-bottom: ${spacing.tiny};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.small};
    align-items: center;

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`
