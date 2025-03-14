import React, { useState } from "react";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Button, Dropdown } from "@/components/index";
import {
  FilterContainer,
  SearchButton,
  SearchContainer,
  SearchInput,
} from "./FilterBar.styles";
import { FilterBarProps } from "./types";

const STATE_OPTIONS = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "open",
    label: "Open",
  },
  {
    value: "closed",
    label: "Closed",
  },
];
const FilterBar: React.FC<FilterBarProps> = ({ onSearch, filter }) => {
  const [searchQuery, setSearchQuery] = useState(filter?.query || "");
  const [status, setStatus] = useState(filter?.status || "all");

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
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='Search for an issue'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchQuery && (
          <Button onClick={() => setSearchQuery("")} variant='icon' data-testid="clear-button">
            <XCircleFillIcon size={16} />
          </Button>
        )}
        <SearchButton onClick={handleSearch} variant='filled' data-testid="search-button">
          <SearchIcon size={16} />
        </SearchButton>
      </SearchContainer>

      <Dropdown
        options={STATE_OPTIONS}
        selectedValue={status}
        onChange={handleStatus}
      />
    </FilterContainer>
  );
};

export default React.memo(FilterBar);
