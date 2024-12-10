'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getMon2, getToday } from '@/function'
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const options = {
  responsive: true,
  aspectRatio: 10 / 3,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      enabled: true, // Bật tooltip khi hover vào các cột
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      }
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 30,
      },

    },
  },
};

export default function Chart_PayAreas({ datai, dataa }) {
  const [age, setAge] = useState(2024);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const monthlyData = [];
  for (let month = 1; month <= 12; month++) {
    const toMonth = getMon2(datai, month, age, dataa);
    monthlyData.push(toMonth);
  }
  const datasets = dataa.map(areaItem => {
    const dataForArea = monthlyData.map(dataForOneMonth => {
      const found = dataForOneMonth.find(d => d.Area === areaItem.Name);
      return found ? found.total : 0;
    });

    return {
      label: areaItem.Name,
      data: dataForArea,
      backgroundColor: areaItem.Color || '#000000',
      barThickness: 25,
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
    };
  });

  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: datasets
  };


  return (
    <div className='box_wrap' style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-between', height: '100%' }}>
      <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p className='text_2'>Tổng nguồn thu theo thời gian</p>
          <p className='text_4_m' style={{ marginTop: 4 }}>(Đơn vị tiền tệ: Triệu đồng)</p>
        </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            size='small'
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ padding: 16 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
