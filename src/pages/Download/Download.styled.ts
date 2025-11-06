import styled from 'styled-components'
import { colours, spacing, textSpacing, breakpoints } from '../../theme'
import { Text } from '../../components'

export const DownloadContent = styled.div`
  padding: ${spacing.medium};
`

export const Section = styled.div`
  margin-bottom: ${spacing.large};
`

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${spacing.small};
  background: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: ${spacing.tapTarget};
  box-sizing: border-box;
  padding: ${spacing.small};
  font-size: ${spacing.small};

  @media (min-width: ${breakpoints.mobileSmall}) {
    padding: ${spacing.small} ${spacing.medium};
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium};
  }

  &:hover {
    background: ${colours.softGrey};
    border-color: ${colours.blue};
    transform: translateY(-${spacing.micro});
  }

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 ${spacing.fine} rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`

export const ButtonContent = styled.div`
  text-align: left;
  flex: 1;
`

export const ButtonDescription = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['colour', 'fontSize']
    return !customProps.includes(prop)
  },
})`
  margin: 0;
  line-height: 1.4;
`

export const InfoSection = styled.div`
  margin-bottom: ${spacing.large};
  padding: ${spacing.small};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  text-align: center;
`

export const EmptyState = styled.div`
  padding: ${textSpacing.large} ${textSpacing.medium};

  p {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
`

export const RankingOption = styled.div`
  border: 1px solid ${colours.softGrey};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  box-sizing: border-box;
  padding: ${spacing.tiny};
  margin-bottom: ${spacing.small};

  @media (min-width: ${breakpoints.mobileSmall}) {
    padding: ${spacing.small};
    margin-bottom: ${spacing.medium};
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: ${spacing.tapTarget};
    gap: ${spacing.tiny};

    @media (min-width: ${breakpoints.mobileSmall}) {
      gap: ${spacing.small};
    }

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      accent-color: ${colours.blue};
      min-width: 16px;
    }
  }
`
