import { Coaster } from "../../types/data";
import * as Styled from "./CoasterComparison.styled";
import { Card } from "../Card";
import { Text } from "../Text";

const formatCountry = (country?: string): string => {
  return country && country.trim() ? `, ${country}` : "";
};

interface CoasterComparisonProps {
  coaster1: Coaster;
  coaster2: Coaster;
  onChoose1?: () => void;
  onChoose2?: () => void;
  clickable?: boolean;
  coaster1Label?: string;
  coaster2Label?: string;
}

/**
 * A component that displays two coasters side by side for comparison and selection.
 *
 * @param coaster1 - The first coaster object to display
 * @param coaster2 - The second coaster object to display
 * @param onChoose1 - Optional callback function when the first coaster is selected
 * @param onChoose2 - Optional callback function when the second coaster is selected
 * @param clickable - Whether the coaster cards can be clicked. Defaults to true
 * @param coaster1Label - Custom label for the first coaster selection
 * @param coaster2Label - Custom label for the second coaster selection
 *
 * @returns A side-by-side comparison interface displaying coaster details in clickable cards
 */

const hasValue = (value?: string): boolean => {
  return Boolean(value?.trim());
};

const renderField = (label: string, value?: string) => {
  if (!hasValue(value)) {
    return null;
  }
  return (
    <p>
      <Text bold>{label}:</Text> {value}
    </p>
  );
};

export default function CoasterComparison({
  coaster1,
  coaster2,
  onChoose1,
  onChoose2,
  clickable = true,
  coaster1Label,
  coaster2Label,
}: CoasterComparisonProps) {
  const coaster1DisplayLabel =
    coaster1Label || (hasValue(coaster1.name) ? coaster1.name : "Coaster 1");
  const coaster2DisplayLabel =
    coaster2Label || (hasValue(coaster2.name) ? coaster2.name : "Coaster 2");

  return (
    <Styled.ComparisonArea>
      <Card
        title={coaster1DisplayLabel}
        subtitle={`${coaster1.park}${formatCountry(coaster1.country)}`}
        clickable={clickable}
        {...(clickable && {
          "aria-label": `Choose ${coaster1DisplayLabel} as your favorite`,
          onClick: onChoose1,
        })}
      >
        {renderField("Manufacturer", coaster1.manufacturer)}
        {renderField("Model", coaster1.model)}
        {renderField("Material", coaster1.material)}
        {renderField("Thrill Level", coaster1.thrillLevel)}
        {renderField("Country", coaster1.country)}
      </Card>

      <Styled.VersusText>VS</Styled.VersusText>

      <Card
        title={coaster2DisplayLabel}
        subtitle={`${coaster2.park}${formatCountry(coaster2.country)}`}
        clickable={clickable}
        {...(clickable && {
          "aria-label": `Choose ${coaster2DisplayLabel} as your favorite`,
          onClick: onChoose2,
        })}
      >
        {renderField("Manufacturer", coaster2.manufacturer)}
        {renderField("Model", coaster2.model)}
        {renderField("Material", coaster2.material)}
        {renderField("Thrill Level", coaster2.thrillLevel)}
        {renderField("Country", coaster2.country)}
      </Card>
    </Styled.ComparisonArea>
  );
}
