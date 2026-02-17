import { Link, Text } from "../";
import * as Styled from "./CurrentDataInfo.styled";
import { RideType } from "../../types/data";

interface CurrentDataInfoProps {
  coasterCount?: number;
  darkRideCount?: number;
  rideType?: RideType;
  showButton?: boolean;
}

/**
 * A component that displays information about the user's current collection with an optional link to view all rides.
 *
 * @param coasterCount - The number of coasters currently in the user's collection
 * @param darkRideCount - The number of dark rides currently in the user's collection
 * @param rideType - The type of rides being displayed (coaster or dark-ride)
 * @param showButton - Whether to display the "View all" button (default: true)
 *
 * @returns An informational component showing the ride count and optionally a button to view all rides
 */

export default function CurrentDataInfo({
  coasterCount = 0,
  darkRideCount = 0,
  rideType = "coaster",
  showButton = true,
}: CurrentDataInfoProps) {
  const buildCountElements = () => {
    const coasterText = coasterCount === 1 ? "coaster" : "coasters";
    const darkRideText = darkRideCount === 1 ? "dark ride" : "dark rides";

    if (coasterCount > 0 && darkRideCount > 0) {
      return (
        <>
          <Text bold>
            {coasterCount} {coasterText}
          </Text>{" "}
          and{" "}
          <Text bold>
            {darkRideCount} {darkRideText}
          </Text>
        </>
      );
    } else if (coasterCount > 0) {
      return (
        <Text bold>
          {coasterCount} {coasterText}
        </Text>
      );
    } else if (darkRideCount > 0) {
      return (
        <Text bold>
          {darkRideCount} {darkRideText}
        </Text>
      );
    } else {
      return <Text bold>no rides</Text>;
    }
  };

  const viewAllText = rideType === "coaster" ? "coasters" : "dark rides";

  return (
    <Styled.CurrentDataInfo>
      <Text as="p">
        You currently have {buildCountElements()} in your collection.
      </Text>
      {showButton && (
        <Link href="/view-coasters" variant="button">
          View all {viewAllText}
        </Link>
      )}
    </Styled.CurrentDataInfo>
  );
}
