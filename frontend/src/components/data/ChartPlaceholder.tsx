import React from 'react';

interface ChartPlaceholderProps {
  title?: string;
  className?: string;
  chartType?: string;
  children?: React.ReactNode;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title = "Chart Placeholder",
  className = "w-2/3",
  chartType = "Line Graph",
  children
}) => {
  return (
    <div className={`${className} bg-white rounded-lg shadow-sm border p-6 flex flex-col`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="w-full flex-1 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        {children || (
          <div className="text-center text-gray-500">
            <div className="text-xl mb-2">📊</div>
            <p className="text-sm">Chart.js {chartType}</p>
            <p className="text-xs text-gray-400 mt-1">Will be rendered here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartPlaceholder;