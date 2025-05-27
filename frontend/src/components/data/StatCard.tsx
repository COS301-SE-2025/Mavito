import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  isDarkMode?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  isDarkMode = true,
}) => {
  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow p-4 flex flex-col justify-between h-full`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <h4
          className={`text-2xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h4>
      </div>
      <div
        className={`text-3xl font-semibold mt-4 text-center pb-8 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatCard;
