import React, { useState } from 'react';

interface FilterableListProps {
  title: string;
  items: string[];
  filterOptions: { value: string; label: string }[];
  className?: string;
  onItemClick?: (item: string, index: number) => void;
}

const FilterableList: React.FC<FilterableListProps> = ({
  items,
  filterOptions,
  className = "w-1/3",
  onItemClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(filterOptions[0]?.value || 'all');

  return (
    <div className={`${className} bg-white rounded-lg shadow-sm border p-4 flex flex-col`}>
      <div className="mb-4">
        <select 
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <ul className="space-y-2 flex-1 overflow-y-auto max-h-64">
        {items.map((item, index) => (
          <li 
            key={index}
            className="px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => onItemClick?.(item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterableList;