import React from "react";
import { SyncIcon } from "@primer/octicons-react";
import { LoaderContainer } from "./Loader.styles";

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <SyncIcon size={100} />
    </LoaderContainer>
  );
};

export default Loader;
