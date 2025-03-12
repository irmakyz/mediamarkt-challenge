export interface FilterBarProps {
  onSearch: (query: string, status: string) => void;
  filter: {
    query: string;
    status: string;
  };
}
