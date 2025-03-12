import React from "react";
import { StyledButton } from "./Button.styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "default",
  disabled,
  isActive,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} variant={variant} isActive={isActive}>
      {children}
    </StyledButton>
  );
};

export default Button;
