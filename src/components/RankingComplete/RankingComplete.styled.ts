import styled from 'styled-components'
import { colours, fonts, textSpacing, spacing } from '../../theme'
import { Text } from '../Text'

export const ResultsList = styled.div`
  margin: ${spacing.medium} 0;
  text-align: left;

  ol {
    padding-left: ${spacing.medium};
  }

  li {
    margin-bottom: ${spacing.tiny};
    line-height: 1.4;
  }
`

export const RankingComplete = styled.div`
  text-align: center;
  padding: ${textSpacing.large};
  background: ${colours.successBg};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.lightGreen};
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.medium} 0;

  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    width: 100%;

    > * {
      width: 100%;
      max-width: 300px;
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
  margin: ${spacing.medium} 0;
  text-align: left;

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
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${colours.lightGrey};
  border-radius: 6px;
  background: ${colours.white};
  box-shadow: 0 1px 3px ${colours.shadowLight};
  transition: border-color 0.2s ease;

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
  min-width: 40px;
  margin-right: ${spacing.small};
  font-size: ${fonts.body};
`

export const CoasterInfo = styled.div`
  flex: 1;
  line-height: 1.5;
  margin-right: ${spacing.small};
  min-width: 0;
`

export const MoveButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};
  align-items: center;
`

export const MoveButton = styled.button`
  background: ${colours.darkGrey};
  color: ${colours.white};
  border: 2px solid transparent;
  width: ${spacing.tapTarget};
  height: ${spacing.tapTarget};
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;

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
