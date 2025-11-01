import styled from 'styled-components'
import { colours, fonts, shadows, spacing, textSpacing } from '../../theme'

export const CenteredCount = styled.p`
  text-align: center;
`

export const DownloadContent = styled.div`
  padding: ${spacing.medium};
`

export const Section = styled.div`
  margin-bottom: ${spacing.large};

  h2,
  h3 {
    margin-bottom: ${spacing.tiny};
    color: ${colours.darkGrey};
  }

  p {
    margin-bottom: ${spacing.tiny};
    color: ${colours.mediumGrey};
  }
`

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${spacing.medium};
  margin-bottom: ${spacing.small};
  background: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  cursor: pointer;
  transition: all 0.2s ease;

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

export const FileIcon = styled.span`
  font-size: ${fonts.huge};
  margin-right: ${textSpacing.small};
  flex-shrink: 0;
`

export const ButtonContent = styled.div`
  text-align: left;
  flex: 1;
`

export const ButtonTitle = styled.h4`
  margin: 0 0 ${textSpacing.fine} 0;
  color: ${colours.darkGrey};
  font-size: ${fonts.large};
  font-weight: 600;
`

export const ButtonDescription = styled.p`
  margin: 0;
  color: ${colours.mediumGrey};
  font-size: ${fonts.small};
  line-height: 1.4;
`

export const StatusMessage = styled.div<{ $isSuccess: boolean }>`
  padding: ${spacing.small};
  margin-bottom: ${spacing.medium};
  border-radius: ${spacing.tiny};
  font-weight: 500;
  text-align: center;

  background: ${props =>
    props.$isSuccess ? colours.successBg : colours.errorBg};
  color: ${props =>
    props.$isSuccess ? colours.successGreen : colours.errorText};
  border: ${spacing.micro} solid
    ${props => (props.$isSuccess ? colours.greenBorder : colours.errorBorder)};
`

export const InfoSection = styled.div`
  margin-bottom: ${spacing.large};
  padding: ${spacing.small};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  text-align: center;

  p {
    margin: 0;
    color: ${colours.mediumGrey};
    font-size: ${fonts.small};
  }
`

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${colours.lightBlue};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${colours.darkerBlue};
    text-decoration: underline;
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.lightBlue};
    outline-offset: ${spacing.mini};
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: ${textSpacing.large} ${textSpacing.medium};

  h2 {
    margin-bottom: ${textSpacing.small};
    color: ${colours.darkGrey};
  }

  p {
    margin-bottom: ${textSpacing.large};
    color: ${colours.mediumGrey};
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
`

export const UploadLink = styled.a`
  display: inline-block;
  padding: ${textSpacing.tiny} ${textSpacing.medium};
  background: ${colours.lightBlue};
  color: ${colours.white};
  text-decoration: none;
  border-radius: ${spacing.tiny};
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${colours.darkerBlue};
  }

  &:focus {
    outline: none;
    box-shadow: ${shadows.focus};
  }
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const RankingOption = styled.div`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  border: 1px solid ${colours.softGrey};

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: ${fonts.body};
    color: ${colours.darkGrey};
    gap: ${spacing.small};

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      accent-color: ${colours.blue};
    }
  }
`

export const LastUpdatedText = styled.p`
  font-size: ${fonts.small};
  color: ${colours.textGrey};
  font-style: italic;
  margin: ${textSpacing.tiny} 0;
`
