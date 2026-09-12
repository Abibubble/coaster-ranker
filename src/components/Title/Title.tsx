import { ReactNode } from "react";
import * as Styled from "./Title.styled";

interface TitleProps {
  children: ReactNode;
}

/**
 * A styled title component that renders as an h1 element with consistent theming across the application.
 *
 * @param children - The title text content to be displayed
 *
 * @returns A styled h1 element with centre alignment and charcoal colouring
 */

export default function Title({ children }: TitleProps) {
  return (
    <Styled.TitleText as="h1" center colour="charcoal">
      {children}
    </Styled.TitleText>
  );
}
