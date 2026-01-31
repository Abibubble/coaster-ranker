import React from "react";
import * as Styled from "./SkipLink.styled";

/**
 * An accessibility component that provides a skip link to the main content for keyboard and screen reader users.
 *
 * @returns A visually hidden link that becomes visible on focus and allows users to skip navigation
 */
export default function SkipLink() {
  const handleSkipLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <Styled.SkipLink href="#main-content" onClick={handleSkipLinkClick}>
      Skip to main content
    </Styled.SkipLink>
  );
}
