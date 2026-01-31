import React from "react";
import * as Styled from "./InfoMessage.styled";
import { colours } from "../../theme";

export type InfoVariant = "error" | "success" | "info";

const getInfoVariantStyles = (variant: InfoVariant) => {
  switch (variant) {
    case "error":
      return {
        backgroundColor: colours.lightRed,
        borderColor: colours.redBorder,
      };
    case "success":
      return {
        backgroundColor: colours.lightGreenBg,
        borderColor: colours.greenBorder,
      };
    case "info":
      return {
        backgroundColor: colours.warningBg,
        borderColor: colours.yellow,
      };
    default:
      return {
        backgroundColor: colours.lightRed,
        borderColor: colours.redBorder,
      };
  }
};

export interface InfoMessageProps {
  variant: InfoVariant;
  children: React.ReactNode;
  bgColour?: keyof typeof colours;
  borderColour?: keyof typeof colours;
  role?: string;
  "aria-live"?: "off" | "assertive" | "polite";
  className?: string;
}

/**
 * A styled message component for displaying information, success, or error messages to users.
 *
 * @param variant - The type of message being displayed (error, success, or info)
 * @param children - The content to be displayed inside the message
 * @param bgColour - Optional override for the background colour
 * @param borderColour - Optional override for the border colour
 * @param role - ARIA role attribute for accessibility
 * @param aria-live - ARIA live region setting for screen readers
 * @param className - Additional CSS classes to apply
 *
 * @returns A styled message container with appropriate colours based on the variant type
 */

export function InfoMessage({
  variant,
  children,
  bgColour,
  borderColour,
  role,
  "aria-live": ariaLive,
  className,
}: InfoMessageProps) {
  const variantStyles = getInfoVariantStyles(variant);

  const backgroundColour = bgColour
    ? colours[bgColour]
    : variantStyles.backgroundColor;

  const borderColor = borderColour
    ? colours[borderColour]
    : variantStyles.borderColor;

  return (
    <Styled.InfoMessage
      as="p"
      $bgColour={backgroundColour}
      $borderColour={borderColor}
      role={role}
      aria-live={ariaLive}
      className={className}
    >
      {children}
    </Styled.InfoMessage>
  );
}
