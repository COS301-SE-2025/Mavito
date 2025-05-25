import React, { useState } from 'react';
import HorizontalBarChart from '../components/data/HorizontalBarChart';
import type { TermData } from '../components/data/termFrequencyChart';
import { FaCheckCircle, FaBookmark, FaComments, FaGlobe } from 'react-icons/fa';
import StatCard from '../components/data/StatCard';
import PieChart from '../components/data/PieChart';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/AnalyticsPage.css'
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const mockData: TermData[] = [
  { term: 'word 1', frequency: 40 },
  { term: 'word 2', frequency: 32 },
  { term: 'word 3', frequency: 25 },
  { term: 'word 4', frequency: 18 },
  { term: 'word 5', frequency: 12 },
    { term: 'word 6', frequency: 40 },
  { term: 'word 7', frequency: 32 },
  { term: 'word 8', frequency: 25 },
  { term: 'word 9', frequency: 18 },
  { term: 'word 10', frequency: 12 },
];


const mockData2: TermData[] = [
  { term: "Statistical Processes/Methodology/Metadata", frequency: 120 },
  { term: "System of Business Registers", frequency: 117 },
  { term: "National Accounts", frequency: 105 },
  { term: "Labour", frequency: 98 },
  { term: "Tourism and Migration", frequency: 84 },
  { term: "National, Provincial and Local Government", frequency: 72 },
  { term: "Geography", frequency: 64 },
  { term: "Housing and Services", frequency: 50 },
  { term: "Industry and Trade", frequency: 47 },
  { term: "Education", frequency: 47 },
  { term: "Public Finance", frequency: 43 },
  { term: "Agriculture", frequency: 41 },
  { term: "Population Census", frequency: 40 },
  { term: "Health and Vital Statistics", frequency: 37 },
  { term: "General Demography", frequency: 36 },
  { term: "Social conditions/Personal services", frequency: 32 },
  { term: "Prices", frequency: 21 },
  { term: "Tourism", frequency: 16 },
  { term: "Private Sector", frequency: 16 },
  { term: "Poverty", frequency: 13 },
  { term: "Construction", frequency: 10 },
  { term: "Household Income and Expenditure", frequency: 9 },
  { term: "Trade", frequency: 7 },
  { term: "Business Enterprises", frequency: 7 },
  { term: "Demography", frequency: 5 },
  { term: "Law/Justice", frequency: 5 },
  { term: "Environment", frequency: 5 },
  { term: "Science and Technology", frequency: 4 },
  { term: "Transport and Communication", frequency: 3 },
  { term: "Income, Pensions, Spending and Wealth", frequency: 3 },
  { term: "Energy", frequency: 2 },
  { term: "Manufacturing", frequency: 1 }
];


const AnalyticsPage: React.FC = () => {

return (
  <div className="p-2 md:p-4 analytics">
    
    {/* Space for Navbar */}
    <div className="pt-16 md:pt-18 min-h-screen w-full p-2 md:p-4 flex flex-col">
      
      {/* Top Section */}
      <div className="h-auto md:h-1/2 w-full p-2 md:p-4 flex flex-col md:flex-row gap-4">
        {/* Pie Chart Section */}
        <div className="w-full md:w-3/8 h-64 md:h-full bg-gray-100 rounded-lg shadow-inner p-4 flex flex-col">
          <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
            Unique Term Counts
          </h2>
          <div className="flex-1 overflow-hidden">
            <PieChart />
          </div>
        </div>

        {/* Stat Cards Section */}
        <div className="w-full md:w-5/8 h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[160px]">
          <StatCard
            title="Feedback Submissions Made"
            value={12}
            icon={<FaComments style={{ color: '#363B4D' }} className="text-xl md:text-2xl" />}
          />
          <StatCard
            title="Approved Submissions"
            value={12}
            icon={<FaCheckCircle style={{ color: '#D62F3F' }} className="text-xl md:text-2xl" />}
          />
          <StatCard
            title="Your Total Saved Terms:"
            value={12}
            icon={<FaBookmark style={{ color: '#00CEAF' }} className="text-xl md:text-2xl" />}
          />
          <StatCard
            title="Your Top Language:"
            value="English"
            icon={<FaGlobe style={{ color: '#F2D001' }} className="text-xl md:text-2xl" />}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-auto md:h-1/2 w-full flex flex-col md:flex-row gap-4 mt-4 p-2 md:p-4">
        <div className="w-full md:w-1/2 h-64 md:h-full bg-white p-4 rounded-lg shadow">
          <HorizontalBarChart data={mockData} title="Term Frequency" />
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full bg-white p-4 rounded-lg shadow">
          <HorizontalBarChart data={mockData2} title="Term Category Frequency" />
        </div>
      </div>
    </div>
  </div>
);
};

export default AnalyticsPage;