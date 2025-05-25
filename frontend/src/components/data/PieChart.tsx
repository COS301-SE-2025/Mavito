import React, { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);
  const [showLegend, setShowLegend] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setShowLegend(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    Chart.Chart.register(
      Chart.ArcElement,
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend
    );

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: [
        'Afrikaans', 'isiNdebele', 'isiXhosa', 'isiZulu', 'Sepedi',
        'Sesotho', 'Setswana', 'siSwati', 'Tshivenda', 'Xitsonga'
      ],
      datasets: [{
        data: [9.2, 9.1, 8.8, 9.2, 9.1, 9.0, 9.0, 8.9, 9.0, 9.1],
        backgroundColor: [
          '#FF6B6B', '#4ECDC4', '#FFD93D', '#1A535C', '#FF9F1C',
          '#5E60CE', '#06D6A0', '#3D348B', '#F15BB5', '#00A8E8'
        ],
        borderColor: [
          '#C44545', '#3AAFA9', '#E6C200', '#144F4F', '#CC7A00',
          '#4648AA', '#04B38A', '#2C2A6B', '#D14491', '#0081B4'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: 'unique_term_counts',
          font: {
            size: 24,
            weight: '700'
          },
          color: '#333',
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: showLegend,
          position: 'right',
          align: 'start',
          labels: {
            padding: 22,
            boxWidth: 10,
            font: {
              size: 20
            },
            color: '#333'
          }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      }
    };

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'pie',
      data,
      options: options as any
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [showLegend]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} className="max-w-full max-h-full" />
    </div>
  );
};

export default PieChart;
