import React from "react";
import { RideType } from "../../types/data";
import * as Styled from "./RideTypeToggle.styled";

export interface RideTypeToggleProps {
  value: RideType;
  onChange: (rideType: RideType) => void;
  name?: string;
  className?: string;
}

/**
 * A tab-styled toggle component for switching between coaster and dark ride types.
 */
export default function RideTypeToggle({
  value,
  onChange,
  name = "ride-type",
  className,
}: RideTypeToggleProps) {
  return (
    <Styled.Container className={className}>
      <Styled.TabGroup role="tablist">
        <Styled.TabButton
          type="button"
          role="tab"
          aria-selected={value === "coaster"}
          $active={value === "coaster"}
          onClick={() => onChange("coaster")}
        >
          Roller Coasters
        </Styled.TabButton>
        <Styled.TabButton
          type="button"
          role="tab"
          aria-selected={value === "dark-ride"}
          $active={value === "dark-ride"}
          onClick={() => onChange("dark-ride")}
        >
          Dark Rides
        </Styled.TabButton>
      </Styled.TabGroup>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </Styled.Container>
  );
}
