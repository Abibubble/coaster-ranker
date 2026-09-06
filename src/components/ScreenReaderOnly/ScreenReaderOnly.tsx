import { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import * as Styled from "./ScreenReaderOnly.styled";

export type ScreenReaderOnlyProps<
  GElementType extends ElementType = ElementType,
> = ComponentPropsWithRef<GElementType> & {
  children: ReactNode;
  as?: GElementType;
};

/**
 * A component that renders content visible only to screen readers, hiding it visually whilst maintaining accessibility.
 *
 * @param children - The content to be available to screen readers only
 * @param as - The HTML element type to render as. Defaults to "span"
 * @param rest - Any other props (e.g. id, htmlFor) are forwarded to the rendered element
 *
 * @returns A visually hidden element that remains accessible to assistive technologies
 */

export default function ScreenReaderOnly({
  children,
  as = "span",
  ...rest
}: ScreenReaderOnlyProps) {
  return (
    <Styled.SROnly as={as} {...rest}>
      {children}
    </Styled.SROnly>
  );
}
