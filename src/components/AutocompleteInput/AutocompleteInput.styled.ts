import styled from "styled-components";
import { spacing, colours, fonts } from "../../theme";

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${spacing.small};
  border: 1px solid ${colours.lightGrey};
  border-radius: 4px;
  font-size: ${fonts.body};

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.blue}33;
  }

  &:required {
    border-left: ${spacing.fine} solid ${colours.blue};
  }

  ${(props) =>
    props.$hasError &&
    `
    border-color: ${colours.red};

    &:focus {
      border-color: ${colours.red};
      box-shadow: 0 0 0 2px ${colours.red}33;
    }
  `}
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  right: ${spacing.small};
  color: ${colours.mediumGrey};
  font-size: ${fonts.small};
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid ${colours.lightGrey};
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SuggestionItem = styled.li<{ $isHighlighted: boolean }>`
  padding: ${spacing.small};
  cursor: pointer;
  background-color: ${(props) =>
    props.$isHighlighted ? colours.veryLightBlue : "transparent"};
  border-bottom: 1px solid ${colours.lightGrey};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colours.veryLightBlue};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: -2px;
  }
`;

export const ParkName = styled.div`
  font-weight: 500;
  color: ${colours.charcoal};
  font-size: ${fonts.body};
`;

export const ParkCountry = styled.div`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin-top: 2px;
`;

export const NoResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid ${colours.lightGrey};
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${spacing.small};
`;

export const ErrorMessage = styled.div`
  margin-top: ${spacing.tiny};
`;
