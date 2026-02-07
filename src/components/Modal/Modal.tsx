import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import * as Styled from "./Modal.styled.js";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  ariaLabel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previouslyFocusedElement.current = document.activeElement;

      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Add escape key listener
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";

        // Restore focus to the previously focused element
        if (previouslyFocusedElement.current instanceof HTMLElement) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Styled.Overlay onClick={handleOverlayClick}>
      <Styled.Modal
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        tabIndex={-1}
      >
        <Styled.Header>
          <Styled.Title>{title}</Styled.Title>
          <Styled.CloseButton
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <Styled.CloseIcon />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Modal>
    </Styled.Overlay>,
    document.body,
  );
};
