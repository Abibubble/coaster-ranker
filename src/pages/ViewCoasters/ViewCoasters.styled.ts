import styled from 'styled-components'
import { Link } from '../../components'
import { colours, spacing, fonts, breakpoints } from '../../theme'

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.giant};

  h2 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.medium};
    font-size: ${fonts.large};
  }

  p {
    color: ${colours.mediumGrey};
    margin-bottom: ${spacing.large};
    line-height: 1.6;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const UploadLink = styled(Link)`
  display: inline-block;
  background-color: ${colours.blue};
  color: ${colours.white};
  padding: ${spacing.small} ${spacing.medium};
  border-radius: ${spacing.tiny};
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colours.darkBlue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
`

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.large};

  h2 {
    color: ${colours.charcoal};
    margin-bottom: ${spacing.small};
    font-size: ${fonts.large};
  }

  p {
    color: ${colours.mediumGrey};
    line-height: 1.6;
    margin-bottom: ${spacing.small};
  }
`

export const UploadInfo = styled.div`
  font-size: ${fonts.small};
  color: ${colours.mutedGrey};
  font-style: italic;
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

export const ActionButton = styled(Link)`
  display: inline-block;
  background-color: ${colours.white};
  color: ${colours.blue};
  border: 2px solid ${colours.blue};
  padding: ${spacing.small} ${spacing.medium};
  border-radius: ${spacing.tiny};
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colours.blue};
    color: ${colours.white};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
`

export const CoastersTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colours.borderGrey};
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
  border-bottom: 1px solid ${colours.borderGrey};

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

export const TableBody = styled.div``

export const TableRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 2fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1fr)
    minmax(120px, 1fr)
    minmax(100px, 1fr)
    minmax(100px, 1fr);
  border-bottom: 1px solid ${colours.borderGrey};
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

export const CoasterName = styled.div`
  font-weight: bold;
  color: ${colours.charcoal};
  margin-bottom: ${spacing.tiny};
`

export const CoasterModel = styled.div`
  font-size: ${fonts.small};
  color: ${colours.mutedGrey};
`

export const TypeBadge = styled.span<{ $type: string }>`
  display: inline-block;
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.tiny};
  font-size: ${fonts.small};
  font-weight: bold;
  text-transform: capitalize;

  background-color: ${({ $type }) => {
    switch ($type.toLowerCase()) {
      case 'steel':
        return colours.blue
      case 'wood':
        return colours.orange
      case 'hybrid':
        return colours.green
      default:
        return colours.mutedGrey
    }
  }};

  color: ${colours.white};
`

export const CoasterCount = styled.div`
  text-align: center;
  font-size: ${fonts.small};
  color: ${colours.mutedGrey};
  font-style: italic;
  padding: ${spacing.medium};
`

export const RemoveButton = styled.button`
  background-color: ${colours.red};
  color: ${colours.white};
  border: none;
  padding: ${spacing.tiny} ${spacing.small};
  border-radius: ${spacing.tiny};
  font-size: ${fonts.small};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    background-color: #c82333;
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid ${colours.red};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: ${fonts.small};
    padding: ${spacing.tiny};
  }
`
