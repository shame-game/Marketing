"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function As({ datas }) {
  const bienHoaCount = datas.filter(i => i.Area === 'Biên Hòa').length;
  const longThanhCount = datas.filter(i => i.Area === 'Long Thành').length;
  const longKhanhCount = datas.filter(i => i.Area === 'Long Khánh').length;

  const data = {
    labels: ["Biên Hòa", "Long Thành", "Long Khánh"],
    datasets: [
      {
        label: "Số lượng học sinh",
        data: [bienHoaCount, longThanhCount, longKhanhCount],
        backgroundColor: ['#ffab00', '#0096b1', '#007867'],
        borderRadius: { bottomRight: 5, topRight: 5 },
        barThickness: 30,
      }
    ],
  };

  const options = {
    indexAxis: 'y', // Đặt biểu đồ thành dạng ngang
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        color: ['#ffab00', '#0096b1', '#007867'],
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        max: datas.length
      },
      y: {
        grid: { display: false },
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
    },
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
