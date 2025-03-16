import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDownIcon } from "@primer/octicons-react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from "./Dropdown.styles";
import { DropdownProps } from "./types";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement | HTMLDivElement>,
    index?: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (index !== undefined) {
        handleSelect(options[index].value);
      } else if (itemRefs.current[0]) {
        itemRefs.current[0].focus();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (index !== undefined) {
        const nextIndex = (index + 1) % options.length;
        itemRefs.current[nextIndex]?.focus();
      } else {
        itemRefs.current[0]?.focus();
      }
    } else if (e.key === "ArrowUp" && isOpen && index !== undefined) {
      e.preventDefault();
      const prevIndex = (index - 1 + options.length) % options.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton
        onClick={toggleDropdown}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        ref={buttonRef}
        onKeyDown={handleKeyDown}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          "Select"}{" "}
        <ChevronDownIcon size={16} aria-hidden='true' />
      </DropdownButton>

      {isOpen && (
        <DropdownMenu role='listbox'>
          {options.map((option, index) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              isActive={option.value === selectedValue}
              role='option'
              aria-selected={option.value === selectedValue}
              tabIndex={0}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
