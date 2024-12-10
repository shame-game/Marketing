'use client';

import dynamic from 'next/dynamic';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

// Sử dụng dynamic import mà không destructuring trực tiếp
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });

const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [20, 13, 9, 3, 12, 11, 12, 3, 14, 32, 22, 10],
      fill: false,
      borderColor: '#00bfae',
      tension: 0.1
    },
    {
      label: 'My First Dataset',
      data: [1, 2, 3, 1, 3, 4, 3, 3, 2, 1, 2, 2],
      fill: false,
      borderColor: '#f94b4b',
      tension: 0.1
    }]
};
const options = {
  responsive: true,
  aspectRatio: 3,
  plugins: {
    legend: { display: false },
    title: { display: false },
    datalabels: {
      display: true,
      align: 'top',
      formatter: function (value, context) {
        return value;
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 20,
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 10,
      }
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};
export default function MyChart() {

  return (
    <div style={{ width: '100%', height: 'auto', }}> {/* Đặt kích thước tùy ý */}
      <Line data={data} options={options} />
    </div>
  ) 
}
