/**
 * General-purpose string formatting utility for consistent text display throughout the application.
 * Handles spacing, casing, and URL-safe transformations with various formatting options.
 */

type Spacing = "space" | "dash" | "under" | "none";
type Casing =
  | "upper"
  | "lower"
  | "lowercase"
  | "first-string"
  | "first-word"
  | "title";

export const formatString = (
  text: string,
  spacing: Spacing,
  casing: Casing,
  url: boolean = true,
): string => {
  let spacedText = text;
  let formattedText;

  if (url && typeof spacedText === "string") {
    spacedText = spacedText.replace(
      /\s*\(([^)]+)\)\s*/g,
      (match, p1, offset) => {
        return (offset === 0 ? "" : "-") + p1;
      },
    );
    spacedText = spacedText
      .replace(/&/g, "and")
      .replace(/½/g, "-5")
      .replace(/['#:.\\\\/]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    spacedText = spacedText.replace(/-+/g, "-");
    spacedText = spacedText.replace(/^[-\s]+|[-\s]+$/g, "");
  }

  // Don't automatically split camelCase - preserve user input
  // This prevents proper nouns like "VelociCoaster" from being split

  switch (spacing) {
    case "space":
      spacedText = spacedText.split("-").join(" ");
      spacedText = spacedText.split("_").join(" ");
      break;
    case "dash":
      spacedText = spacedText.split(" ").join("-");
      spacedText = spacedText.split("_").join("-");
      spacedText = spacedText.replace(/-+/g, "-");
      break;
    case "under":
      spacedText = spacedText.split(" ").join("_");
      spacedText = spacedText.split("-").join("_");
      break;
    default:
      spacedText = spacedText.split("-").join("");
      spacedText = spacedText.split("_").join("");
      spacedText = spacedText.split(" ").join("");
      break;
  }

  switch (casing) {
    case "upper":
      formattedText = spacedText.toUpperCase();
      break;
    case "lower":
    case "lowercase":
      formattedText = spacedText.toLowerCase();
      break;
    case "first-string":
      formattedText =
        spacedText.charAt(0).toUpperCase() + spacedText.slice(1).toLowerCase();
      break;
    case "first-word":
      formattedText = spacedText
        // Split on whitespace only, keeping the whitespace runs as tokens so
        // they can be rejoined verbatim. We deliberately do NOT treat accented
        // letters (é, ñ, …) or in-word punctuation (apostrophes) as word
        // boundaries — doing so would capitalise the letter after them, e.g.
        // "Pégase" -> "PéGase" or "Cobra's" -> "Cobra'S".
        .split(/(\s+)/)
        .map((word) => {
          if (/^\s+$/.test(word) || word.length === 0) {
            // Preserve whitespace runs
            return word;
          }
          // Only modify words that are entirely lowercase.
          // Preserve words that are mixed case or all uppercase (likely
          // acronyms/proper nouns, e.g. "VelociCoaster", "RMC").
          if (word === word.toLowerCase()) {
            // Uppercase the first cased letter (Unicode-aware), leaving any
            // leading punctuation and all following characters untouched.
            return word.replace(/\p{L}/u, (letter) => letter.toUpperCase());
          }
          return word;
        })
        .join("");
      break;
    default:
      formattedText = spacedText
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
      break;
  }

  return formattedText;
};

export default formatString;
