import { FC, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import '../../styles/DropdownFilter.scss';

interface DropdownFilterProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const DropdownFilter: FC<DropdownFilterProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
  return (
    <div className="dropdown-filter" ref={ref}>
      <button
        type="button"
        className="dropdown-button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {selected || label}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt}
              className={`dropdown-item ${opt === selected ? 'selected' : ''}`}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
