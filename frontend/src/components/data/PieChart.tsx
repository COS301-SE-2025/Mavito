import React, { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';
import type { ChartOptions, TooltipItem } from 'chart.js';

interface PieChartData {
  label: string;
  value: number;
  backgroundColor?: string;
  borderColor?: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  showTitle?: boolean;
  isDarkMode?: boolean;
  formatValue?: (value: number) => string;
}

const defaultFormatValue = (value: number): string => String(value);

const DEFAULT_COLORS = [
  '#26D7B9',
  '#FAE56B',
  '#F87171',
  '#6C63FF',
  '#FFA69E',
  '#4DD599',
  '#3AB0FF',
  '#FFB703',
  '#B388EB',
  '#FF9F68',
];

const DEFAULT_BORDER_COLORS = [
  '#1BA997',
  '#E5CE00',
  '#E04343',
  '#544DD4',
  '#CC837A',
  '#3DAE7F',
  '#2D90D0',
  '#D58F00',
  '#8B6AB3',
  '#D97F4A',
];

const PieChart: React.FC<PieChartProps> = ({
  data,
  title = 'Chart',
  showTitle = false,
  isDarkMode = true,
  formatValue = defaultFormatValue,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);
  const [showLegend, setShowLegend] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setShowLegend(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    Chart.Chart.register(
      Chart.ArcElement,
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
    );

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx || !data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: data.map((item) => item.label),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map(
            (item, index) =>
              item.backgroundColor ||
              DEFAULT_COLORS[index % DEFAULT_COLORS.length],
          ),
          borderColor: data.map(
            (item, index) =>
              item.borderColor ||
              DEFAULT_BORDER_COLORS[index % DEFAULT_BORDER_COLORS.length],
          ),
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: showTitle,
          text: title,
          font: {
            size: 24,
            weight: 700,
          },
          color: isDarkMode ? '#ffffff' : '#333333',
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        legend: {
          display: showLegend,
          position: 'right',
          align: 'start',
          labels: {
            padding: 22,
            boxWidth: 10,
            font: {
              size: 20,
            },
            color: isDarkMode ? '#ffffff' : '#333333',
          },
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          titleColor: isDarkMode ? '#ffffff' : '#374151',
          bodyColor: isDarkMode ? '#ffffff' : '#374151',
          borderColor: isDarkMode ? '#6b7280' : '#e5e7eb',
          borderWidth: 1,
          callbacks: {
            label: function (context: TooltipItem<'pie'>) {
              const value = formatValue(context.parsed); // context.parsed is number for pie
              return `${context.label || ''}: ${value}`;
            },
          },
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    };

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options,
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [data, showLegend, isDarkMode, title, showTitle, formatValue]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} className="max-w-full max-h-full" />
    </div>
  );
};

export default PieChart;
