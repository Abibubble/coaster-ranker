import React from "react";
import * as Styled from "./CodeBlock.styled";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A component that renders code content in a styled pre-formatted block with syntax highlighting.
 *
 * @param children - The code content to be displayed
 * @param className - Additional CSS classes to apply
 *
 * @returns A styled pre element containing the formatted code content
 */

export default function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <Styled.CodeBlock
      as="pre"
      className={className}
      colour="slateGrey"
      fontSize="small"
      mb="small"
      mt="small"
    >
      {children}
    </Styled.CodeBlock>
  );
}
