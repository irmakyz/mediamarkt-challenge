import React from "react";
import { StyledButton, StyledSelect } from "./Button.styles";
import { ButtonProps } from "./types";


const Button: React.FC<ButtonProps> = ({ onClick, children, variant = "default", disabled, value, onChange }) => {
  if (variant === "dropdown") {
    return (
      <StyledSelect value={value} onChange={onChange} disabled={disabled}>
        {children}
      </StyledSelect>
    );
  }
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
