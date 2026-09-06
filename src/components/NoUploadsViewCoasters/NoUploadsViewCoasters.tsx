import React from "react";
import {
  MainContent,
  Title,
  Text,
  Link,
  RideTypeToggle,
} from "../../components";
import { RideType } from "../../types/data";
import * as Styled from "./NoUploadsViewCoasters.styled";

interface NoUploadsViewCoastersProps {
  rideTypeLabel: string;
  ridePluralLabel: string;
  rideType: RideType;
  onRideTypeChange: (rideType: RideType) => void;
}

export const NoUploadsViewCoasters: React.FC<NoUploadsViewCoastersProps> = ({
  rideTypeLabel,
  ridePluralLabel,
  rideType,
  onRideTypeChange,
}) => {
  return (
    <MainContent>
      <Title>Your {rideTypeLabel}</Title>

      <RideTypeToggle value={rideType} onChange={onRideTypeChange} />

      <section>
        <Styled.EmptyState>
          <Text as="h2" center colour="darkGrey" mb="medium" fontSize="large">
            No {ridePluralLabel} yet
          </Text>
          <Text as="p" center colour="mediumGrey" mb="large">
            You haven't uploaded any {ridePluralLabel} yet. Use one of the
            upload methods to add some {ridePluralLabel} to your collection.
          </Text>
          <Link href="/upload" variant="button">
            Go to upload page
          </Link>
        </Styled.EmptyState>
      </section>
    </MainContent>
  );
};
