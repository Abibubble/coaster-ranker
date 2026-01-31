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
