import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Styled from "./Link.styled";
import { fonts } from "../../theme";

interface LinkProps {
  children: ReactNode;
  href: string;
  bold?: boolean;
  center?: boolean;
  dark?: boolean;
  fontSize?: string;
  variant?: "text" | "button" | "back";
  onClick?: () => void;
  external?: boolean;
}

/**
 * A flexible link component that can render as either a React Router Link or regular anchor element with various styling options.
 *
 * @param children - The content to be displayed inside the link
 * @param href - The URL or path to navigate to
 * @param bold - Whether the link text should be bold. Defaults to false
 * @param center - Whether the link should be centre-aligned. Defaults to false
 * @param dark - Whether to use dark styling variant. Defaults to false
 * @param fontSize - Font size for the link text. Defaults to body font size
 * @param variant - Visual style variant of the link. Defaults to "text"
 * @param onClick - Optional click handler function
 * @param external - Whether the link is external or starts with http. Defaults to false
 *
 * @returns A styled link that renders as Router Link for internal navigation or anchor tag for external links
 */

export default function Link({
  children,
  href,
  bold = false,
  center = false,
  dark = false,
  fontSize = fonts.body,
  variant = "text",
  onClick,
  external = false,
}: LinkProps) {
  // For external links or links starting with http/https, use regular anchor
  if (external || href.startsWith("http")) {
    return (
      <Styled.Link
        as="a"
        href={href}
        $bold={bold}
        $center={center}
        $dark={dark}
        $fontSize={fontSize}
        $variant={variant}
        onClick={onClick}
      >
        {children}
      </Styled.Link>
    );
  }

  // For internal links, use React Router Link
  return (
    <Styled.Link
      as={RouterLink}
      to={href}
      $bold={bold}
      $center={center}
      $dark={dark}
      $fontSize={fontSize}
      $variant={variant}
      onClick={onClick}
    >
      {children}
    </Styled.Link>
  );
}
