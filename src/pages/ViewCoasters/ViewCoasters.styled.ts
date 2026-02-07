import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.medium};

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.large};
  }
`;

export const CoastersSummary = styled.div`
  margin-bottom: ${spacing.medium};
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const SortBadge = styled.span`
  margin-left: ${spacing.small};
  padding: ${spacing.micro} ${spacing.tiny};
  background-color: ${colours.lightBlue};
  color: ${colours.white};
  font-size: ${fonts.small};
  border-radius: ${spacing.micro};
  font-weight: normal;
`;

export const FiltersSection = styled.div`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.medium};
  background-color: ${colours.veryLightGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.borderGrey};
`;

export const FilterHeading = styled.h3`
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

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
`;

export const FilterIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-block;
  width: 12px;
  height: 8px;
  margin-left: ${spacing.tiny};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const FilterContent = styled.div<{ $isOpen: boolean }>`
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.medium};
  margin: ${spacing.medium} 0;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
`;

export const FilterLabel = styled.label`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.charcoal};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterSelect = styled.select`
  padding: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  background-color: ${colours.white};
  color: ${colours.charcoal};
  font-size: ${fonts.body};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px ${colours.shadowLight};
  min-height: ${spacing.tapTarget};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${spacing.small} center;
  background-size: 12px;
  padding-right: ${spacing.large};

  &:hover {
    border-color: ${colours.blue};
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.blue}20;
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.body};
  }
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.small};
`;

export const TableHelpText = styled.div`
  margin-bottom: ${spacing.medium};
  text-align: center;
`;

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
`;

export const ActionsBar = styled.div`
  display: flex;
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
  }
`;

export const CoastersTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${spacing.medium};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};

  @media (max-width: ${breakpoints.tablet}) {
    overflow-x: visible;
    border: none;
  }
`;

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
`;

export const HeaderCell = styled.div<{ $isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  font-weight: bold;
  color: ${colours.charcoal};
  font-size: ${fonts.small};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    ${({ $isHiddenOnTablet }) =>
      $isHiddenOnTablet &&
      `
      display: none;
    `}
  }
`;

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
`;

export const TableCell = styled.div<{ $isHiddenOnTablet?: boolean }>`
  padding: ${spacing.medium};
  color: ${colours.slateGrey};
  font-size: ${fonts.body};
  align-self: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
    margin-bottom: ${spacing.tiny};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.small};
    align-items: start;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`;

export const ClickableTableCell = styled(TableCell)<{
  $isHiddenOnTablet?: boolean;
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
`;

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
`;

export const MobileFieldValue = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    font-size: ${fonts.body};
    color: ${colours.slateGrey};
    justify-self: start;
    align-self: center;
  }
`;

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
`;

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
`;

export const CoastersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
  max-width: 1106px;
`;

export const CoasterCard = styled.div`
  background: ${colours.white};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  padding: ${spacing.medium};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

export const CoasterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.medium};
  gap: ${spacing.medium};
`;

export const CoasterTitle = styled.div`
  flex: 1;
`;

export const CoasterActions = styled.div`
  display: flex;
  gap: ${spacing.small};
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
  }
`;

export const CoasterDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${spacing.small};
  }
`;

export const CoasterField = styled.div`
  /* Desktop: flex column layout */
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};

  @media (max-width: 768px) {
    /* Mobile: grid layout with labels on left, values on right */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.small};
    align-items: start;
    padding: 0;
    margin-bottom: ${spacing.tiny};

    &:last-child {
      margin-bottom: 0;
      margin-top: ${spacing.small};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`;

export const FieldLabel = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  color: ${colours.mediumGrey};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FieldValue = styled.span`
  font-size: ${fonts.body};
  color: ${colours.charcoal};
  word-break: break-word;
`;

export const ClickableFieldValue = styled.button`
  background: none;
  border: none;
  padding: ${spacing.tiny};
  margin: -${spacing.tiny};
  font-size: ${fonts.body};
  color: ${colours.charcoal};
  cursor: pointer;
  text-align: left;
  border-radius: ${spacing.micro};
  word-break: break-word;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colours.paleGrey};
    color: ${colours.blue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
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

export const MobileLayout = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

export const DesktopLayout = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: ${spacing.medium};
  padding: 0 ${spacing.small};
`;

export const MobileRank = styled.div`
  position: absolute;
  left: 0;
`;

export const MobileName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: ${fonts.medium};
  color: ${colours.charcoal};
`;
