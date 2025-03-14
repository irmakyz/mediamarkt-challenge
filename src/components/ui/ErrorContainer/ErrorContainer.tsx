import React from "react";
import Image from "next/image";
import { ErrorContainerProps } from "./types";
import { Container } from "./ErrorContainer.styles";

const ErrorContainer: React.FC<ErrorContainerProps> = ({ message }) => {
  return (
    <Container data-testid='error-message'>
      <Image src={"/error_image.png"} height={100} width={100} alt='error' />
      <span>{message || "Failed to fetch issues. Please try again."}</span>
    </Container>
  );
};

export default ErrorContainer;
