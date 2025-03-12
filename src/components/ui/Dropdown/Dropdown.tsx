import React, { useState } from "react";
import { ChevronDownIcon } from "@primer/octicons-react";
import { DropdownContainer, DropdownButton, DropdownMenu, DropdownItem } from "./Dropdown.styles";
import { DropdownProps } from "./types";

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === selectedValue)?.label || "Select"}{" "}
        <ChevronDownIcon size={16} />
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem key={option.value} onClick={() => handleSelect(option.value)} isActive={option.value === selectedValue}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
