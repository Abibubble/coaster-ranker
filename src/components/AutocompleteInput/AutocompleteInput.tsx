import React, { useState, useRef, useEffect } from "react";
import { Text } from "../Text";
import * as Styled from "./AutocompleteInput.styled";

// Generate unique ID for component instances
let idCounter = 0;

export interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: { name: string; country: string }) => void;
  suggestions: Array<{ id: string; name: string; country: string }>;
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
}

export default function AutocompleteInput({
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
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate unique ID if none provided
  const inputId = id || `autocomplete-input-${++idCounter}`;

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
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          const suggestion = suggestions[highlightedIndex];
          handleSuggestionClick(suggestion);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: {
    name: string;
    country: string;
  }) => {
    onChange(suggestion.name);
    onSuggestionSelect?.(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (hasMinCharacters) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    if (hasMinCharacters) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = (_e: React.FocusEvent) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
      blurTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up any pending blur timeout
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      hasMinCharacters &&
      suggestions.length > 0 &&
      document.activeElement === inputRef.current
    ) {
      setIsOpen(true);
    }
  }, [suggestions, hasMinCharacters]);

  const shouldShowSuggestions =
    isOpen && hasMinCharacters && suggestions.length > 0;
  const shouldShowNoResults =
    isOpen && hasMinCharacters && suggestions.length === 0 && !isLoading;

  return (
    <Styled.Container ref={containerRef}>
      {label && (
        <Text
          as="label"
          bold
          colour="charcoal"
          fontSize="small"
          htmlFor={inputId}
        >
          {label}
          {required && " *"}
        </Text>
      )}

      <Styled.InputWrapper>
        <Styled.Input
          ref={inputRef}
          type="text"
          id={inputId}
          name={name}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          $hasError={!!error}
          aria-expanded={shouldShowSuggestions}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
          aria-label={ariaLabel}
          aria-activedescendant={
            highlightedIndex >= 0 && suggestions[highlightedIndex]
              ? `suggestion-${highlightedIndex}`
              : undefined
          }
        />

        {isLoading && <Styled.LoadingIndicator>...</Styled.LoadingIndicator>}
      </Styled.InputWrapper>

      {shouldShowSuggestions && (
        <Styled.SuggestionsList role="listbox">
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
              <Styled.ParkName>{suggestion.name}</Styled.ParkName>
              <Styled.ParkCountry>{suggestion.country}</Styled.ParkCountry>
            </Styled.SuggestionItem>
          ))}
        </Styled.SuggestionsList>
      )}

      {shouldShowNoResults && (
        <Styled.NoResults>
          <Text fontSize="small" colour="mediumGrey">
            No parks found. You can still enter a custom park name.
          </Text>
        </Styled.NoResults>
      )}

      {error && (
        <Styled.ErrorMessage>
          <Text fontSize="small" colour="red">
            {error}
          </Text>
        </Styled.ErrorMessage>
      )}
    </Styled.Container>
  );
}
