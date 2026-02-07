import React, { useState, useRef, useEffect } from "react";
import { Text } from "../Text";
import * as Styled from "../AutocompleteInput/AutocompleteInput.styled";

let idCounter = 0;

export interface AutocompleteConfig<TSuggestionItem, TSelectionData = unknown> {
  primaryText: (item: TSuggestionItem) => string;
  secondaryText?: (item: TSuggestionItem) => string;
  getValue: (item: TSuggestionItem) => string;
  getSelectionData: (item: TSuggestionItem) => TSelectionData;
  getId: (item: TSuggestionItem) => string;
  ariaLabel: string;
  noResultsMessage: string;
}

export interface GenericAutocompleteInputProps<
  TSuggestionItem,
  TSelectionData = unknown,
> {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (selectionData: TSelectionData) => void;
  suggestions: Array<TSuggestionItem>;
  config: AutocompleteConfig<TSuggestionItem, TSelectionData>;
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

export default function GenericAutocompleteInput<
  TSuggestionItem,
  TSelectionData = unknown,
>({
  value,
  onChange,
  onSuggestionSelect,
  suggestions,
  config,
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
}: GenericAutocompleteInputProps<TSuggestionItem, TSelectionData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const justSelectedRef = useRef<boolean>(false);

  const inputId = id || `generic-autocomplete-input-${++idCounter}`;

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

    if (newValue.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: TSuggestionItem) => {
    const value = config.getValue(suggestion);
    const selectionData = config.getSelectionData(suggestion);

    onChange(value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    justSelectedRef.current = true;
    onSuggestionSelect?.(selectionData);
    inputRef.current?.focus();

    // Reset the flag after a brief delay
    setTimeout(() => {
      justSelectedRef.current = false;
    }, 100);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

    // Don't reopen dropdown if we just selected a suggestion
    if (justSelectedRef.current) {
      return;
    }

    if (value.trim() && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
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

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

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
          aria-label={config.ariaLabel}
        >
          {suggestions.map((suggestion, index) => (
            <Styled.SuggestionItem
              key={config.getId(suggestion)}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
              $isHighlighted={index === highlightedIndex}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Styled.ParkName>
                {config.primaryText(suggestion)}
              </Styled.ParkName>
              {config.secondaryText && (
                <Styled.ParkCountry>
                  {config.secondaryText(suggestion)}
                </Styled.ParkCountry>
              )}
            </Styled.SuggestionItem>
          ))}
        </Styled.SuggestionsList>
      )}

      {shouldShowNoResults && (
        <Styled.NoResults>
          <Text fontSize="small" colour="mediumGrey">
            {config.noResultsMessage}
          </Text>
        </Styled.NoResults>
      )}
    </Styled.Container>
  );
}
