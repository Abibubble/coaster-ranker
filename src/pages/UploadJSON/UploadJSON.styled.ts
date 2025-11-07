import styled from 'styled-components'
import { colours, spacing, fonts, breakpoints, shadows } from '../../theme'

export const Section = styled.div`
  margin-bottom: ${spacing.medium};

  p {
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacing.large};
  }
`

export const RequiredFields = styled.div`
  margin: ${spacing.medium} 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${spacing.tiny} 0;
    line-height: 1.5;
    position: relative;
    padding-left: ${spacing.large};

    &::before {
      content: '✓';
      color: ${colours.green};
      font-weight: bold;
      font-size: ${fonts.body};
      position: absolute;
      left: 0;
      top: ${spacing.tiny};
    }

    span {
      margin-right: ${spacing.tiny};
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacing.large};
  }
`

export const ExampleFiles = styled.div`
  margin: ${spacing.medium} 0;

  details {
    border: ${spacing.micro} solid ${colours.borderGrey};
    border-radius: ${spacing.tiny};
    padding: ${spacing.small};
    background-color: ${colours.veryLightGrey};
  }

  summary {
    cursor: pointer;
    padding: ${spacing.tiny} 0;
    margin-bottom: 0;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      color: ${colours.orange};
      font-size: ${fonts.small};
      margin-right: ${spacing.tiny};
      transition: transform 0.2s ease;
    }
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin: ${spacing.large} 0;
  }
`

export const JsonTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${spacing.small};
  border: ${spacing.mini} solid ${colours.lightGrey};
  border-radius: ${spacing.tiny};
  font-family: 'Courier New', monospace;
  font-size: ${fonts.small};
  line-height: 1.4;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: ${shadows.focus};
  }

  &:disabled {
    background-color: ${colours.veryLightGrey};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${colours.mutedGrey};
    font-style: italic;
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacing.medium} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: ${spacing.micro};
    background: ${colours.lightGrey};
  }

  span {
    padding: 0 ${spacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin: ${spacing.large} 0;
  }
`

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileSmall}) {
    padding: 0;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const FileLabel = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? colours.lightGrey : colours.orange};
  color: ${colours.white};
  border-radius: ${spacing.fine};
  cursor: ${(props: { $disabled?: boolean }) =>
    props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: ${spacing.tapTarget};
  box-sizing: border-box;
  text-align: center;
  padding: ${spacing.small};
  font-size: ${fonts.small};
  width: calc(100% - ${spacing.medium});
  margin: 0 ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileSmall}) {
    width: auto;
    max-width: 100%;
    margin: 0;
    padding: ${spacing.small} ${spacing.medium};
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.small} ${spacing.large};
    font-size: ${fonts.body};
  }

  ${(props: { $disabled?: boolean }) =>
    props.$disabled &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}

  &:hover {
    background-color: ${(props: { $disabled?: boolean }) =>
      props.$disabled ? colours.lightGrey : colours.yellow};
    transform: ${(props: { $disabled?: boolean }) =>
      props.$disabled ? 'none' : 'translateY(-1px)'};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.orange};
    outline-offset: ${spacing.mini};
  }

  &:active {
    transform: ${(props: { $disabled?: boolean }) =>
      props.$disabled ? 'none' : 'translateY(0)'};
  }
`
