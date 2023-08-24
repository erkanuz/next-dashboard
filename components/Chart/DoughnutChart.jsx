import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  ArcElement, Tooltip, Legend
);

export const DoughnutChart = ({ products }) => {

    const typeCounts = {};
    products.forEach(product => {
      if (typeCounts[product.type]) {
        typeCounts[product.type]++;
      } else {
        typeCounts[product.type] = 1;
      }
    });

    const chartLabels = Object.keys(typeCounts).map(type => `${type} (${typeCounts[type]})`);
  
    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: Object.values(typeCounts),
          backgroundColor: [
            "#FF6384",
            "#7dd3fc",
            "#4ade80",
            "#c084fc",
          ],
        },
      ],
    };

  return <Doughnut data={chartData} />;
};