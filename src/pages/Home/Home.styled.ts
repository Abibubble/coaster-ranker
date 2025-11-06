import styled from 'styled-components'
import { spacing, textSpacing, colours, breakpoints } from '../../theme'

export const Section = styled.section`
  margin-bottom: ${spacing.large};
  display: flex;
  justify-content: center;
`

export const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(
    135deg,
    ${colours.navyBlue} 0%,
    ${colours.darkBlue} 100%
  );
  color: ${colours.white};
  padding: ${spacing.giant} ${spacing.medium} ${spacing.large};
  margin: -${spacing.medium} -${spacing.medium} ${spacing.large};
  border-radius: 0 0 ${spacing.medium} ${spacing.medium};
  overflow: hidden;
  min-height: 500px;
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.large} ${spacing.small};
    margin: -${spacing.small} -${spacing.small} ${spacing.large};
    min-height: 400px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 120, 204, 0.1) 0%,
      rgba(44, 62, 80, 0.3) 100%
    );
    z-index: 1;
  }
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

export const HeroImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('/images/homepage/hyperia-thorpe-park.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 0;

  @media (max-width: ${breakpoints.tablet}) {
    opacity: 0.2;
  }
`

export const CTAButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    align-items: center;
  }
`

export const FeaturesSection = styled.section`
  margin-bottom: ${spacing.large};
`

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.small};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${spacing.tiny};
  }
`

export const FeatureCard = styled.div`
  background: linear-gradient(
    135deg,
    ${colours.white} 0%,
    ${colours.paleGrey} 100%
  );
  border: 1px solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  padding: ${spacing.medium};
  box-shadow: 0 ${spacing.fine} ${spacing.medium} ${colours.shadowLight};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${spacing.fine};
    background: linear-gradient(
      90deg,
      ${colours.blue} 0%,
      ${colours.lightBlue} 50%,
      ${colours.blue} 100%
    );
  }
`

export const FeatureIcon = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: ${spacing.small};
  filter: drop-shadow(0 2px 4px ${colours.shadowLight});
`

export const FeatureContent = styled.div`
  text-align: center;
  padding: ${spacing.small};
`

export const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
`

export const Step = styled.div`
  display: flex;
  gap: ${spacing.small};
  align-items: flex-start;

  @media (max-width: ${breakpoints.mobileLarge}) {
    gap: ${spacing.tiny};
  }
`

export const StepNumber = styled.div`
  background: ${colours.blue};
  color: ${colours.white};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: ${spacing.fine};
`

export const CTASection = styled.section`
  margin-bottom: ${spacing.large};
  display: flex;
  justify-content: center;
  text-align: center;
`

export const OrderedList = styled.ol`
  margin: ${textSpacing.small} 0;
  padding-left: ${textSpacing.medium};
`
