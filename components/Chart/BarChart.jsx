import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

export const BarChart = ({ topics }) => {

      const chartConfig = {
        labels: topics.map((user) => user.customer_name.split(' ')[0]), // Get the first part of the name before the space
        datasets: [
          {
            label: 'User Salary',
            backgroundColor: '#dcfce7',
            borderColor: '#86efac',
            borderWidth: 1,
            hoverBackgroundColor: '#bbf7d0',
            hoverBorderColor: '#86efac',
            data: topics.map((user) => user.total_amount), // Extract the amount for each user
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
        responsive: true
      };

  return (
    <div className='relative w-full m-auto rounded-lg md:col-span-2 lg:h-[65vh] h-[50vh] p-4'>
        <Bar data={chartConfig} options={options} />
    </div>
  )
}