import {
  FC,
  InputHTMLAttributes,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react';
import { Search } from 'lucide-react';
import '../../styles/SearchBar.scss';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search term',
  debounceMs = 300,
}) => {
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState(value);

  // Debounced logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, debounceMs);
    return () => {
      clearTimeout(timer);
    };
  }, [value, debounceMs]);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
