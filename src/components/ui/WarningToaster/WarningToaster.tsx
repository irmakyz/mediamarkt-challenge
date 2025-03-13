import React from "react";
import { WarningContainer } from "./WarningToaster.styles";
import { InfoIcon } from "@primer/octicons-react";
import { WarningToasterProps } from "./types";

const WarningToaster: React.FC<WarningToasterProps> = ({ children }) => {
  return (
    <WarningContainer>
      <InfoIcon size={16} />
      {children}
    </WarningContainer>
  );
};

export default WarningToaster;
