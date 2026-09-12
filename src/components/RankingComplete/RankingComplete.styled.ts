import styled from 'styled-components'
import { colours, fonts, textSpacing, spacing, breakpoints } from '../../theme'
import { Text } from '../Text'

export const ResultsList = styled.div`
  text-align: left;

  /* Mobile-first: smaller margin */
  margin: ${spacing.small} 0;

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    margin: ${spacing.medium} 0;
  }

  ol {
    /* Mobile-first: smaller padding */
    padding-left: ${spacing.small};

    /* Tablet and up */
    @media (min-width: ${breakpoints.tablet}) {
      padding-left: ${spacing.medium};
    }
  }

  li {
    margin-bottom: ${spacing.tiny};
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`

export const NumberZeroSection = styled.div`
  text-align: left;
  background: ${colours.veryLightBlue};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.accentText};
  padding: ${spacing.small};
  margin: ${spacing.small} 0;

  ul {
    padding-left: ${spacing.medium};
    margin: ${spacing.tiny} 0 0;
  }

  li {
    margin-bottom: ${spacing.tiny};
  }
`

export const NumberZeroRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.medium};
  flex-wrap: wrap;
`

export const NumberZeroOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  margin-bottom: ${spacing.large};
`

export const NumberZeroOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.small} ${spacing.medium};
  background-color: ${({ $isActive }) =>
    $isActive ? colours.veryLightBlue : "transparent"};
  border: ${spacing.micro} solid
    ${({ $isActive }) => ($isActive ? colours.accentText : colours.borderGrey)};
  border-radius: ${spacing.tiny};
  cursor: pointer;
  font-size: ${fonts.medium};
  color: ${colours.charcoal};
  text-align: left;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? colours.veryLightBlue : colours.veryLightGrey};
    border-color: ${colours.accentText};
  }

  &:focus {
    outline: 2px solid ${colours.accentText};
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }
`

export const NumberZeroOptionLabel = styled.span`
  display: block;
`

export const CheckIcon = styled.span`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%236d28d9' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  flex-shrink: 0;
`

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.medium};
  padding-top: ${spacing.medium};
  border-top: ${spacing.micro} solid ${colours.borderGrey};
`

export const RankingComplete = styled.div`
  text-align: center;
  background: ${colours.veryLightBlue};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.accentText};

  /* Mobile-first: small padding for mobile */
  padding: ${textSpacing.small};

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    padding: ${textSpacing.medium};
  }

  /* Tablet and up */
  @media (min-width: ${breakpoints.tablet}) {
    padding: ${textSpacing.large};
  }

  /* Desktop and up */
  @media (min-width: ${breakpoints.desktop}) {
    padding: ${textSpacing.large} ${textSpacing.huge};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  /* Mobile-first: stack vertically with small gap and margin */
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
  margin: ${spacing.small} 0;
  width: 100%;

  > * {
    width: 100%;
    max-width: 300px;
  }

  /* Tablet and up: horizontal layout with more margin */
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    margin: ${spacing.medium} 0;

    > * {
      width: auto;
      max-width: none;
    }
  }
`

export const EditInstructions = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['center', 'colour', 'fontSize', 'mb']
    return !customProps.includes(prop)
  },
})`
  background: ${colours.veryLightGrey};
  padding: ${spacing.small};
  border-radius: 4px;
  border: 1px solid ${colours.lightGrey};
`

export const EditableList = styled.div`
  text-align: left;

  /* Mobile-first: smaller margin */
  margin: ${spacing.small} 0;

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    margin: ${spacing.medium} 0;
  }

  ol {
    padding-left: 0;
    list-style: none;
  }
`

export const EditableItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.small};
  border: 1px solid ${colours.lightGrey};
  border-radius: 6px;
  background: ${colours.surface};
  box-shadow: 0 1px 3px ${colours.shadowLight};
  transition: border-color 0.2s ease;

  /* Mobile-first: smaller padding */
  padding: ${spacing.small};

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    padding: ${spacing.small} ${spacing.medium};
  }

  /* Tablet and up: more generous padding */
  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }

  &:hover {
    border-color: ${colours.accentText};
  }

  &:focus-within {
    border-color: ${colours.accentText};
    box-shadow: 0 0 0 2px color-mix(in srgb, ${colours.accentText} 20%, transparent);
  }
`

export const Position = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['bold', 'colour']
    return !customProps.includes(prop)
  },
})`
  font-size: ${fonts.body};

  /* Mobile-first: smaller width and margin */
  min-width: 30px;
  margin-right: ${spacing.tiny};

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    min-width: 35px;
    margin-right: ${spacing.small};
  }

  /* Tablet and up */
  @media (min-width: ${breakpoints.tablet}) {
    min-width: 40px;
  }
`

export const CoasterInfo = styled.div`
  flex: 1;
  line-height: 1.5;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* Mobile-first: smaller margin */
  margin-right: ${spacing.tiny};

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    margin-right: ${spacing.small};
  }
`

export const MoveButtons = styled.div`
  display: flex;
  align-items: center;

  /* Mobile-first: horizontal layout for easier touch */
  flex-direction: row;
  gap: ${spacing.tiny};

  /* Tablet and up: vertical layout */
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`

export const MoveButton = styled.button`
  background: ${colours.darkGrey};
  color: ${colours.white};
  border: 2px solid ${colours.borderGrey};
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;

  /* Mobile-first: larger touch targets, smaller font */
  width: ${spacing.tapTarget};
  height: ${spacing.tapTarget};
  font-size: 16px;

  /* Tablet and up: slightly smaller, larger font */
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }

  &:hover {
    background: ${colours.blue};
    border-color: ${colours.darkBlue};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.accentText};
    box-shadow: 0 0 0 3px color-mix(in srgb, ${colours.accentText} 30%, transparent);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${colours.shadowMedium};
  }
`

export const ViewAllLink = styled.div`
  text-align: center;
  margin-top: ${spacing.small};

  /* Mobile medium and up */
  @media (min-width: ${breakpoints.mobileMedium}) {
    margin-top: ${spacing.medium};
  }

  /* Override Link component styling for this specific use case */
  a {
    color: ${colours.accentText} !important;
    text-decoration: underline !important;

    &:hover {
      color: ${colours.accentText} !important;
      text-decoration: underline !important;
    }

    &:visited {
      color: ${colours.accentText} !important;
    }

    &:focus {
      color: ${colours.accentText} !important;
      text-decoration: underline !important;
    }
  }
`
