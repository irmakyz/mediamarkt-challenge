export interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: "default" | "dropdown";
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  