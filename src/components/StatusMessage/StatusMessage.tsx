import React from "react";
import * as Styled from "./StatusMessage.styled";

interface StatusMessageProps {
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  return (
    <Styled.StatusContainer role="status" aria-live="polite">
      {message}
    </Styled.StatusContainer>
  );
};
