export interface StyledButtonProps {
  isActive?: boolean;
  variant?: "default" | "filled" | "icon";
}
export interface ButtonProps extends StyledButtonProps{
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}