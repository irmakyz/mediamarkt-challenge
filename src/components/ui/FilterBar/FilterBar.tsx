import React, { useState } from "react";
import { SearchIcon, XIcon } from "@primer/octicons-react";
import { Button } from "@/components/index";
import { FilterContainer, SearchInput } from "./FilterBar.styles";
import { FilterBarProps } from "./types";

const FilterBar: React.FC<FilterBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");

  const handleStatus = (status: string) => {
    setStatus(status);
    onSearch(searchQuery, status);
  };
  const handleSearch = () => {
    onSearch(searchQuery, status);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <FilterContainer>
      <SearchInput
        type='text'
        placeholder='Search for an issue'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchQuery && (
        <Button onClick={() => setSearchQuery("")}>
          <XIcon size={16} />
        </Button>
      )}
      <Button onClick={handleSearch}>
        <SearchIcon size={16} />
      </Button>
      <Button
        variant='dropdown'
        value={status}
        onChange={(e) => handleStatus(e.target.value)}
      >
        <option value='all'>All</option>
        <option value='open'>Open</option>
        <option value='closed'>Closed</option>
      </Button>
    </FilterContainer>
  );
};

export default FilterBar;
