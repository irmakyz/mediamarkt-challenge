import { render, screen, fireEvent } from "../../jest.setup";
import { Dropdown } from "@/components";
import { DropdownProps } from "@/components/ui/Dropdown/types";

const mockOptions: DropdownProps["options"] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("Dropdown Component", () => {
  test("renders dropdown button with default selected value", () => {
    render(
      <Dropdown
        options={mockOptions}
        selectedValue='option1'
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Option 1");
  });

  test("opens dropdown menu when button is clicked", () => {
    render(
      <Dropdown
        options={mockOptions}
        selectedValue='option1'
        onChange={jest.fn()}
      />
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", () => {
    const mockOnChange = jest.fn();
    render(
      <Dropdown
        options={mockOptions}
        selectedValue='option1'
        onChange={mockOnChange}
      />
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  test("closes dropdown menu after selection", () => {
    render(
      <Dropdown
        options={mockOptions}
        selectedValue='option1'
        onChange={jest.fn()}
      />
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);

    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
  });
});
