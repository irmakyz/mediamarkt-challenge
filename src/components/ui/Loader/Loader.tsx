import React from "react";
import { SyncIcon } from "@primer/octicons-react";
import { LoaderContainer } from "./Loader.styles";

const Loader: React.FC = () => {
  return (
    <LoaderContainer data-testid='loader'>
      <SyncIcon size={100} />
    </LoaderContainer>
  );
};

export default Loader;
