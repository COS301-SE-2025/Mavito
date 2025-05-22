import { FC, InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import '../../styles/SearchBar.scss';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder = 'Search term',
  ...props
}) => {
  return (
    <div className="search-bar">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        {...props}
      />
    </div>
  );
};

export default SearchBar;
