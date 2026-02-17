import styled from "styled-components";
import { colours, spacing, breakpoints } from "../../theme";
import { Text } from "../../components";

export const DownloadContent = styled.div`
  padding: ${spacing.small};
  max-width: 100%;

  @media (min-width: ${breakpoints.mobileMedium}) {
    padding: ${spacing.small} ${spacing.medium};
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium};
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium} ${spacing.large};
    max-width: 800px;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: ${spacing.large};
    max-width: 900px;
  }
`;

export const Section = styled.div`
  margin-bottom: ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileMedium}) {
    margin-bottom: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacing.medium};
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${colours.white};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: ${spacing.tapTarget};
  box-sizing: border-box;
  box-shadow: 0 1px 3px ${colours.shadowLight};
  position: relative;
  overflow: hidden;
  padding: ${spacing.small};
  margin-bottom: ${spacing.small};
  background: linear-gradient(
    135deg,
    ${colours.white} 0%,
    ${colours.veryLightGrey} 100%
  );
  border-left: ${spacing.fine} solid ${colours.blue};
  animation: slideInUp 0.3s ease-out;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(${spacing.small});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: ${breakpoints.mobileMedium}) {
    padding: ${spacing.small} ${spacing.medium};
    margin-bottom: ${spacing.medium};
    min-height: calc(${spacing.tapTarget} + ${spacing.small});
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium};
    border-radius: ${spacing.medium};
    margin-bottom: ${spacing.medium};
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.large};
    min-height: auto;
    border-width: ${spacing.fine};
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: ${spacing.large} ${spacing.giant};
  }

  &:hover {
    background: linear-gradient(
      135deg,
      ${colours.veryLightGrey} 0%,
      ${colours.paleGrey} 100%
    );
    border-color: ${colours.blue};
    border-left-color: ${colours.darkBlue};
    transform: translateY(-${spacing.mini});
    box-shadow: 0 4px 12px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    border-left-color: ${colours.darkBlue};
    box-shadow: 0 0 0 ${spacing.fine} rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px ${colours.shadowMedium};
  }
`;

export const ButtonContent = styled.div`
  text-align: left;
  flex: 1;
  min-width: 0;

  h4 {
    margin-bottom: ${spacing.tiny};
    text-shadow: 0 1px 2px ${colours.shadowLight};

    @media (min-width: ${breakpoints.mobileMedium}) {
      margin-bottom: ${spacing.small};
    }
  }
`;

export const ButtonDescription = styled(Text).withConfig({
  shouldForwardProp: (prop) => {
    const customProps = ["colour", "fontSize"];
    return !customProps.includes(prop);
  },
})`
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${breakpoints.mobileSmall}) {
    font-size: 0.875rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    line-height: 1.6;
  }
`;

export const InfoSection = styled.div`
  text-align: center;

  @media (min-width: ${breakpoints.mobileMedium}) {
    margin-bottom: ${spacing.small};
  }

  p {
    margin: 0;
    line-height: 1.6;

    @media (max-width: ${breakpoints.mobileSmall}) {
      font-size: 0.875rem;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  background: linear-gradient(
    135deg,
    ${colours.veryLightGrey} 0%,
    ${colours.paleGrey} 100%
  );
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  border-left: ${spacing.fine} solid ${colours.mediumGrey};
  box-shadow: 0 2px 8px ${colours.shadowLight};
  padding: ${spacing.medium} ${spacing.small};

  @media (min-width: ${breakpoints.mobileMedium}) {
    padding: ${spacing.large} ${spacing.medium};
  }

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.large};
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.giant} ${spacing.large};
    border-radius: ${spacing.medium};
    max-width: 600px;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: ${spacing.giant};
  }

  p {
    line-height: 1.6;
    margin: 0 auto ${spacing.large} auto;
    max-width: 300px;

    @media (min-width: ${breakpoints.mobileMedium}) {
      max-width: 400px;
    }

    @media (min-width: ${breakpoints.tablet}) {
      max-width: 500px;
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  /* Ensure buttons are centered on small screens */
  a[role="button"],
  button {
    display: inline-block;
    margin: 0 auto;
  }

  /* For very small screens, ensure proper centering */
  @media (max-width: ${breakpoints.mobileMedium}) {
    a[role="button"],
    button {
      display: block;
      width: fit-content;
      margin: 0 auto;
    }
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${spacing.medium};

  @media (min-width: ${breakpoints.mobileMedium}) {
    margin-bottom: ${spacing.large};
  }

  h3 {
    position: relative;
    padding-bottom: ${spacing.small};

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: ${spacing.large};
      height: ${spacing.mini};
      background: ${colours.blue};
      border-radius: ${spacing.micro};
    }
  }
`;

export const DownloadOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileMedium}) {
    gap: ${spacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    gap: ${spacing.medium};
  }
`;

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

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: ${colours.blue};
      min-width: 16px;
    }
  }
`;
