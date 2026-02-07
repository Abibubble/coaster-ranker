import styled from "styled-components";
import { breakpoints, colours, fonts, spacing } from "../../theme";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.medium};
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: ${spacing.tiny};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  @media (max-width: ${breakpoints.mobileLarge}) {
    max-width: calc(100vw - ${spacing.large});
    margin: ${spacing.medium};
  }
`;

export const Header = styled.div`
  padding: ${spacing.medium} ${spacing.medium} ${spacing.small}
    ${spacing.medium};
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${fonts.large};
  font-weight: bold;
  color: ${colours.charcoal};
  margin: 0;
  padding-right: ${spacing.medium};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: ${spacing.tiny};
  cursor: pointer;
  color: ${colours.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${spacing.micro};

  &:hover {
    color: ${colours.charcoal};
    background-color: ${colours.veryLightGrey};
  }

  &:focus {
    outline: 2px solid ${colours.blue};
    outline-offset: 2px;
  }
`;

export const CloseIcon = styled.span`
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23666' d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const Content = styled.div`
  padding: ${spacing.medium};
  max-height: calc(90vh - 100px);
  overflow-y: auto;
`;
