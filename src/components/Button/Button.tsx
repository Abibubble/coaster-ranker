import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Button.styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "success" | "disabled" | "warning";
  as?: "button" | "a" | "link";
  href?: string;
  to?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  external?: boolean;
}

/**
 * A flexible button component that can render as a button, anchor tag, or React Router Link.
 *
 * @param children - The content to be displayed inside the button
 * @param onClick - Optional click handler function
 * @param variant - Visual style variant of the button. Defaults to "default"
 * @param as - The HTML element or component type to render as. Can be "button", "a", or "link"
 * @param href - URL for anchor tags when `as` is "a"
 * @param to - Route path for React Router Links when `as` is "link"
 * @param type - HTML button type attribute when `as` is "button"
 * @param className - Additional CSS classes to apply
 * @param external - Whether the link is external (used with anchor tags)
 * @param props - Additional props passed to the underlying component
 *
 * @returns A styled button component that renders as the specified element type
 */
export default function Button({
  children,
  onClick,
  variant = "default",
  as = "button",
  href,
  to,
  type,
  className,
  external = false,
  ...props
}: ButtonProps) {
  if (as === "link" && to) {
    return (
      <Styled.Button
        as={Link}
        to={to}
        onClick={onClick}
        $variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Styled.Button>
    );
  }

  if (as === "a" && (href || external)) {
    return (
      <Styled.Button
        as="a"
        href={href}
        onClick={onClick}
        $variant={variant}
        className={className}
        {...props}
      >
        {children}
      </Styled.Button>
    );
  }

  return (
    <Styled.Button
      as="button"
      onClick={onClick}
      $variant={variant}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </Styled.Button>
  );
}
