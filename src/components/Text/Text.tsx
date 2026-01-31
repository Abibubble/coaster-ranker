import React from "react";
import { StyledText } from "./Text.styled";
import { colours, fonts, spacing } from "../../theme";

export interface TextProps {
  children: React.ReactNode;
  as?: React.ElementType;
  bold?: boolean;
  center?: boolean;
  className?: string;
  colour?: keyof typeof colours;
  fontSize?: keyof typeof fonts;
  htmlFor?: string;
  id?: string;
  italic?: boolean;
  mb?: keyof typeof spacing;
  mt?: keyof typeof spacing;
  role?: string;
  "aria-live"?: "off" | "assertive" | "polite";
}

/**
 * A flexible text component that can render as various HTML elements with comprehensive styling and accessibility options.
 *
 * @param children - The text content to be displayed
 * @param as - The HTML element type to render as. Defaults to "span"
 * @param bold - Whether the text should be bold. Defaults to false
 * @param center - Whether the text should be centre-aligned. Defaults to false
 * @param className - Additional CSS classes to apply
 * @param colour - Text colour from the theme palette. Defaults to "black"
 * @param fontSize - Font size from the theme typography scale. Defaults to "body"
 * @param htmlFor - HTML for attribute when rendering as label
 * @param id - ID attribute for the element
 * @param italic - Whether the text should be italicised. Defaults to false
 * @param mb - Bottom margin from the theme spacing scale
 * @param mt - Top margin from the theme spacing scale
 * @param role - ARIA role attribute for accessibility
 * @param aria-live - ARIA live region setting for screen readers
 *
 * @returns A styled text element with comprehensive theming and accessibility support
 */

export function Text({
  children,
  as = "span",
  bold = false,
  center = false,
  className,
  colour = "black",
  fontSize = "body",
  htmlFor,
  id,
  italic = false,
  mb,
  mt,
  role,
  "aria-live": ariaLive,
}: TextProps) {
  const htmlAttributes: Record<string, unknown> = {};

  if (as) htmlAttributes.as = as;
  if (className) htmlAttributes.className = className;
  if (htmlFor) htmlAttributes.htmlFor = htmlFor;
  if (id) htmlAttributes.id = id;
  if (role) htmlAttributes.role = role;
  if (ariaLive) htmlAttributes["aria-live"] = ariaLive;

  return (
    <StyledText
      {...htmlAttributes}
      $bold={bold}
      $center={center}
      $colour={colour}
      $fontSize={fontSize}
      $italic={italic}
      $mb={mb}
      $mt={mt}
    >
      {children}
    </StyledText>
  );
}
