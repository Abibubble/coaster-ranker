import { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import * as Styled from "./ScreenReaderOnly.styled";

export type ScreenReaderOnlyProps<
  GElementType extends ElementType = ElementType,
> = ComponentPropsWithRef<GElementType> & {
  children: ReactNode;
  as?: GElementType;
  id?: string;
};

/**
 * A component that renders content visible only to screen readers, hiding it visually whilst maintaining accessibility.
 *
 * @param children - The content to be available to screen readers only
 * @param as - The HTML element type to render as. Defaults to "span"
 * @param id - Optional ID attribute for the element
 *
 * @returns A visually hidden element that remains accessible to assistive technologies
 */

export default function ScreenReaderOnly({
  children,
  as = "span",
  id,
}: ScreenReaderOnlyProps) {
  return (
    <Styled.SROnly as={as} id={id}>
      {children}
    </Styled.SROnly>
  );
}
