import React, { useState } from "react";
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
}

export const NoUploadsViewCoasters: React.FC<NoUploadsViewCoastersProps> = ({
  rideTypeLabel,
  ridePluralLabel,
}) => {
  const [rideType, setRideType] = useState<RideType>("coaster");

  return (
    <MainContent>
      <Title>Your {rideTypeLabel}</Title>

      <RideTypeToggle
        value={rideType}
        onChange={(newRideType) => setRideType(newRideType)}
      />

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
