import React from "react";
import { Coaster } from "../../types/data";
import * as Styled from "./SimplifiedCoasterItem.styled";

interface SimplifiedCoasterItemProps {
  coaster: Coaster;
  isRanked?: boolean;
  onExpand?: () => void;
}

export const SimplifiedCoasterItem: React.FC<SimplifiedCoasterItemProps> = ({
  coaster,
  isRanked = false,
  onExpand,
}) => {
  const rank = coaster.isNumberZero ? (
    <Styled.SimplifiedRank>#0</Styled.SimplifiedRank>
  ) : isRanked && coaster.rankPosition ? (
    <Styled.SimplifiedRank>#{coaster.rankPosition}</Styled.SimplifiedRank>
  ) : (
    <Styled.SimplifiedRank>—</Styled.SimplifiedRank>
  );

  if (!onExpand) {
    return (
      <Styled.SimplifiedItem as="div">
        {rank}
        <Styled.SimplifiedName>{coaster.name}</Styled.SimplifiedName>
        <Styled.SimplifiedPark>{coaster.park}</Styled.SimplifiedPark>
      </Styled.SimplifiedItem>
    );
  }

  return (
    <Styled.SimplifiedItem
      as="button"
      type="button"
      onClick={onExpand}
      aria-expanded={false}
      aria-label={`Show full details for ${coaster.name} at ${coaster.park}`}
    >
      {rank}
      <Styled.SimplifiedName>{coaster.name}</Styled.SimplifiedName>
      <Styled.SimplifiedPark>{coaster.park}</Styled.SimplifiedPark>
    </Styled.SimplifiedItem>
  );
};
