import React from "react";
import Image from "next/image";
import { ErrorContainerProps } from "./types";
import { Container } from "./ErrorContainer.styles";

const ErrorContainer: React.FC<ErrorContainerProps> = ({ message }) => {
  return (
    <Container data-testid='error-message' role='alert' aria-live='assertive'>
      <Image
        src={"/error_image.png"}
        height={100}
        width={100}
        alt='Error illustration'
      />
      <p>{message || "Failed to fetch issues. Please try again."}</p>
    </Container>
  );
};

export default ErrorContainer;
