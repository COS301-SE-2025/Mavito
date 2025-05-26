import {
  FC,
  InputHTMLAttributes,
  useState,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react';
import { Search } from 'lucide-react';
import '../../styles/SearchBar.scss';

interface Suggestion {
  id: string;
  label: string;
}

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => Promise<void>;
  fetchSuggestions: (term: string) => Promise<Suggestion[]>;
  minChars?: number;
  placeholder?: string;
  debounceMs?: number;
}

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  fetchSuggestions,
  minChars = 2,
  placeholder = 'Search term',
  debounceMs = 300,
}) => {
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  //const suggestionsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, debounceMs);
    return () => {
      clearTimeout(timer);
    };
  }, [value, debounceMs]);

  // Fetch suggestions
  useEffect(() => {
    if (debounced.length >= minChars) {
      void fetchSuggestions(debounced).then(setSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debounced, fetchSuggestions, minChars]);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      setSuggestions([]);
      await onSearch(value);
    }
  };

  const handleSuggestionClick = async (label: string) => {
    setValue(label);
    setShowSuggestions(false);
    await onSearch(label);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-bar" role="search">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            void handleKeyDown(e);
          }}
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="suggestion-item"
              onClick={() => {
                void handleSuggestionClick(s.label);
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
