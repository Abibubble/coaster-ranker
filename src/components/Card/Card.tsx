import React from "react";
import * as Styled from "./Card.styled";
import { Text } from "../Text";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  titleSize?: "small" | "medium" | "large";
  clickable?: boolean;
  variant?: "default" | "elevated" | "outlined";
  maxWidth?: string;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  role?: string;
}

/**
 * A versatile card component that displays content in a structured container with optional header, footer, and actions.
 *
 * @param children - The main content to be displayed inside the card
 * @param title - Optional title text displayed in the card header
 * @param subtitle - Optional subtitle text displayed below the title
 * @param titleSize - Size variant for the title text. Defaults to "medium"
 * @param clickable - Whether the card can be clicked as a button. Defaults to false
 * @param variant - Visual style variant of the card. Defaults to "default"
 * @param maxWidth - Maximum width constraint for the card
 * @param footer - Optional footer content displayed at the bottom of the card
 * @param actions - Optional action buttons or controls displayed in the card
 * @param onClick - Click handler function when clickable is true
 * @param className - Additional CSS classes to apply
 * @param aria-label - ARIA label for accessibility
 * @param role - ARIA role attribute for accessibility
 *
 * @returns A styled card component that can be either a div or button depending on clickable prop
 */

export default function Card({
  children,
  title,
  subtitle,
  titleSize = "medium",
  clickable = false,
  variant = "default",
  maxWidth,
  footer,
  actions,
  onClick,
  className,
  "aria-label": ariaLabel,
  role,
}: CardProps) {
  const Component = clickable ? "button" : "div";

  return (
    <Styled.CardContainer
      as={Component}
      $clickable={clickable}
      $variant={variant}
      $maxWidth={maxWidth}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      role={role}
    >
      {(title || subtitle) && (
        <Styled.CardHeader>
          {title && (
            <Text as="h3" bold colour="darkGrey" fontSize={titleSize} mb="tiny">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text as="p" colour="mediumGrey" fontSize="small">
              {subtitle}
            </Text>
          )}
        </Styled.CardHeader>
      )}

      <Styled.CardContent>{children}</Styled.CardContent>

      {footer && <Styled.CardFooter>{footer}</Styled.CardFooter>}

      {actions && <Styled.CardActions>{actions}</Styled.CardActions>}
    </Styled.CardContainer>
  );
}
