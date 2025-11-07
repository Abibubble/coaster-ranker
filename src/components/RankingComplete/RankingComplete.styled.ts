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

export const RankingComplete = styled.div`
  text-align: center;
  background: ${colours.successBg};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.lightGreen};

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
  background: ${colours.white};
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
    border-color: ${colours.blue};
  }

  &:focus-within {
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.veryLightBlue};
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
  border: 2px solid transparent;
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
    border-color: ${colours.blue};
    box-shadow: 0 0 0 3px ${colours.veryLightBlue};
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
    color: ${colours.darkBlue} !important;
    text-decoration: underline !important;

    &:hover {
      color: ${colours.darkerBlue} !important;
      text-decoration: underline !important;
    }

    &:visited {
      color: ${colours.darkBlue} !important;
    }

    &:focus {
      color: ${colours.darkerBlue} !important;
      text-decoration: underline !important;
    }
  }
`
