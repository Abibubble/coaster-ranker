import React, { useState, useRef, useEffect } from "react";
import { Text } from "../Text";
import * as Styled from "../AutocompleteInput/AutocompleteInput.styled";

// Generate unique ID for component instances
let idCounter = 0;

export interface ManufacturerAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: { manufacturer: string }) => void;
  suggestions: Array<{ id: string; manufacturer: string }>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  isLoading?: boolean;
  error?: string | null;
  hasMinCharacters?: boolean;
  "aria-label"?: string;
  "data-form-type"?: string;
}

export default function ManufacturerAutocompleteInput({
  value,
  onChange,
  onSuggestionSelect,
  suggestions,
  placeholder,
  label,
  required,
  id,
  name,
  autoComplete,
  isLoading,
  error,
  hasMinCharacters,
  "aria-label": ariaLabel,
  "data-form-type": dataFormType,
}: ManufacturerAutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const justSelectedRef = useRef<boolean>(false);

  // Generate unique ID if none provided
  const inputId = id || `manufacturer-autocomplete-input-${++idCounter}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setHighlightedIndex(-1);

    // Open dropdown when user types, let the hook handle minimum character logic
    if (newValue.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: {
    id: string;
    manufacturer: string;
  }) => {
    onChange(suggestion.manufacturer);
    setIsOpen(false);
    setHighlightedIndex(-1);
    justSelectedRef.current = true;
    onSuggestionSelect?.(suggestion);
    inputRef.current?.focus();

    // Reset the flag after a brief delay
    setTimeout(() => {
      justSelectedRef.current = false;
    }, 100);
  };

  const handleFocus = () => {
    // Clear any pending blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

    // Don't reopen dropdown if we just selected a suggestion
    if (justSelectedRef.current) {
      return;
    }

    // Open dropdown if we have suggestions
    if (value.trim() && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow click on suggestions
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const shouldShowSuggestions =
    isOpen && suggestions.length > 0 && hasMinCharacters && !isLoading;

  const shouldShowNoResults =
    isOpen &&
    suggestions.length === 0 &&
    hasMinCharacters &&
    value.trim().length > 0 &&
    !isLoading;

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  const inputAriaLabel = ariaLabel || label;
  const listboxId = `${inputId}-listbox`;

  return (
    <Styled.Container ref={containerRef}>
      {label && (
        <Text
          as="label"
          htmlFor={inputId}
          bold
          colour="charcoal"
          fontSize="small"
        >
          {label}
          {required && " *"}
        </Text>
      )}

      <Styled.InputWrapper>
        <Styled.Input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete || "off"}
          required={required}
          $hasError={!!error}
          role="combobox"
          aria-label={inputAriaLabel}
          aria-haspopup="listbox"
          aria-expanded={shouldShowSuggestions}
          aria-autocomplete="list"
          aria-controls={shouldShowSuggestions ? listboxId : undefined}
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
          data-form-type={dataFormType}
        />

        {isLoading && (
          <Styled.LoadingIndicator>
            <Text fontSize="small" colour="mediumGrey">
              Loading...
            </Text>
          </Styled.LoadingIndicator>
        )}
      </Styled.InputWrapper>

      {error && (
        <Text fontSize="small" colour="red">
          {error}
        </Text>
      )}

      {shouldShowSuggestions && (
        <Styled.SuggestionsList
          id={listboxId}
          role="listbox"
          aria-label="Manufacturer suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <Styled.SuggestionItem
              key={suggestion.id}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              $isHighlighted={index === highlightedIndex}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Styled.ParkName>{suggestion.manufacturer}</Styled.ParkName>
            </Styled.SuggestionItem>
          ))}
        </Styled.SuggestionsList>
      )}

      {shouldShowNoResults && (
        <Styled.NoResults>
          <Text fontSize="small" colour="mediumGrey">
            No manufacturers found. You can still enter a custom manufacturer
            name.
          </Text>
        </Styled.NoResults>
      )}
    </Styled.Container>
  );
}
