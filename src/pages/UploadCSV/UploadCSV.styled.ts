import styled from 'styled-components'
import { colours, spacing, fonts } from '../../theme'

export const Instructions = styled.div`
  margin-bottom: ${spacing.large};

  p {
    line-height: 1.6;
  }
`

export const RequiredFields = styled.div`
  margin: ${spacing.large} 0;

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
  }
`

export const ExampleFiles = styled.div`
  margin: ${spacing.large} 0;

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
`

export const FileSection = styled.div`
  margin-bottom: ${spacing.large};
`

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
`

export const FileInput = styled.input`
  display: none;
`

export const FileLabel = styled.label<{ $isLoading?: boolean }>`
  display: inline-block;
  background-color: ${(props: { $isLoading?: boolean }) =>
    props.$isLoading ? colours.lightGrey : colours.blue};
  color: ${colours.white};
  padding: ${spacing.small} ${spacing.large};
  border-radius: ${spacing.fine};
  font-size: ${fonts.body};
  cursor: ${(props: { $isLoading?: boolean }) =>
    props.$isLoading ? 'wait' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${(props: { $isLoading?: boolean }) =>
    props.$isLoading &&
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
    background-color: ${(props: { $isLoading?: boolean }) =>
      props.$isLoading ? colours.lightGrey : colours.darkBlue};
    transform: ${(props: { $isLoading?: boolean }) =>
      props.$isLoading ? 'none' : 'translateY(-1px)'};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }

  &:active {
    transform: ${(props: { $isLoading?: boolean }) =>
      props.$isLoading ? 'none' : 'translateY(0)'};
  }
`

export const CurrentDataInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.small};
  margin-top: ${spacing.small};
  color: ${colours.charcoal};
  font-size: ${fonts.small};
`
