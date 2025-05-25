import React from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

export interface TermData {
  term: string;
  frequency: number;
}

interface HorizontalBarChartProps {
  data: TermData[];
  className?: string;
  title?: string;
  showChartTitle?: boolean; 
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ 
  data, 
  className, 
  title,
  showChartTitle = false 
}) => {
  const labels = data.map((item) => item.term);
  const frequencies = data.map((item) => item.frequency);
  const barColors = data.map(
    (_, index) => `hsl(${(index * 40) % 360}, 70%, 60%)`
  );

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: barColors,
        borderColor: barColors.map((color) => color.replace('60%', '45%')),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: showChartTitle && !!title,
        text: title || '',
        font: {
          size: 42,
          weight: 'bold',
        },
        color: '#374151',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => `Frequency: ${context.parsed.x}`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#374151',
          font: { size: 14, weight: 500 as const },
        },
      },
    },
  };

  const titleHeight = title && !showChartTitle ? 40 : 0;
  const canvasHeight = data.length * 32 + titleHeight;

  return (
    <div className={`relative w-full h-full overflow-y-auto ${className}`}>
      {title && !showChartTitle && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {title}
          </h3>
        </div>
      )}
      
      <div style={{ height: canvasHeight - titleHeight }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;