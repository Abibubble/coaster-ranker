import * as Styled from "./MainContent.styled";
import { ReactNode } from "react";

export type MainContentProps = {
  children: ReactNode;
};

/**
 * A wrapper component that provides the main content container with proper semantic HTML and accessibility attributes.
 *
 * @param children - The main page content to be displayed
 *
 * @returns A styled main content container with proper landmark identification for screen readers
 */

export default function MainContent({ children }: MainContentProps) {
  return (
    <Styled.ContentContainer id="main-content">
      {children}
    </Styled.ContentContainer>
  );
}
