import React from "react";
import { Coaster } from "../../types/data";
import * as Styled from "./SimplifiedCoasterItem.styled";

interface SimplifiedCoasterItemProps {
  coaster: Coaster;
  isRanked?: boolean;
}

export const SimplifiedCoasterItem: React.FC<SimplifiedCoasterItemProps> = ({
  coaster,
  isRanked = false,
}) => {
  return (
    <Styled.SimplifiedItem>
      {isRanked && coaster.rankPosition ? (
        <Styled.SimplifiedRank>#{coaster.rankPosition}</Styled.SimplifiedRank>
      ) : (
        <Styled.SimplifiedRank>—</Styled.SimplifiedRank>
      )}
      <Styled.SimplifiedName>{coaster.name}</Styled.SimplifiedName>
      <Styled.SimplifiedPark>{coaster.park}</Styled.SimplifiedPark>
    </Styled.SimplifiedItem>
  );
};
