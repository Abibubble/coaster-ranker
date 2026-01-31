import { Link, Text } from "../";
import * as Styled from "./CurrentDataInfo.styled";

interface CurrentDataInfoProps {
  coasterCount: number;
}

/**
 * A component that displays information about the user's current coaster collection with a link to view all coasters.
 *
 * @param coasterCount - The number of coasters currently in the user's collection
 *
 * @returns An informational component showing the coaster count and a button to view all coasters
 */

export default function CurrentDataInfo({
  coasterCount,
}: CurrentDataInfoProps) {
  return (
    <Styled.CurrentDataInfo>
      <Text as="p">
        You currently have <Text bold>{coasterCount} coasters</Text> in your
        collection.
      </Text>
      <Link href="/view-coasters" variant="button">
        View all coasters
      </Link>
    </Styled.CurrentDataInfo>
  );
}
