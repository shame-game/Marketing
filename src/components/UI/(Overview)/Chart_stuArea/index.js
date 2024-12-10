'use client';

import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const data = {
  labels: ['Biên Hòa', 'Long Thành', 'Long Khánh'],
  datasets: [
    {
      label: 'Học sinh đã nghỉ',
      data: [2, 2, 0],
      backgroundColor: '#ffe8e8'
    },
    {
      label: 'Học sinh chờ lên khóa',
      data: [12, 12, 0],
      backgroundColor: '#ffb71c21'
    },
    {
      label: 'Học sinh đang học',
      data: [33, 50, 0],
      backgroundColor: '#00bfae21',
    },
    {
      label: 'Học sinh đang học',
      data: [0, 0, 0],
      backgroundColor: '#00bfae21',
    }
  ],
};

const options = {
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false, 
    },
    title: {
      display: false
    },
    datalabels: {
      display: true,
      color: 'black',
      anchor: (context) => {
        if (context.datasetIndex === context.chart.data.datasets.length - 1) {
          return 'end';
        }
        return 'center';
      },
      align: (context) => {
        if (context.datasetIndex === context.chart.data.datasets.length - 1) {
          return 'end';
        }
        return 'center';
      },
      formatter: (value, context) => {
        const datasetIndex = context.datasetIndex;
        const datasets = context.chart.data.datasets;
        const index = context.dataIndex;
        const total = datasets.reduce((sum, dataset) => sum + dataset.data[index], 0);

        // Chỉ hiển thị tổng trên dataset cuối cùng (tránh hiển thị lặp lại)
        if (datasetIndex === datasets.length - 1) { return 'Tổng: ' + total + ' Học sinh'; }
      },
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
};

export default function StackedBarChart() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div style={{
      padding: 8, borderRadius: 5, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', height: 'calc(100% - 16px)', background: 'white'
      , display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            size='small'
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value={10}>Năm này</MenuItem>
            <MenuItem value={20}>Tháng này</MenuItem>
            <MenuItem value={30}>Tuần này</MenuItem>
          </Select>
        </FormControl>
        <div style={{marginRight: 32}}>Thời gian: 14/02/2024 - 17/10/2024</div>
      </div>
      <Bar data={data} options={options} />
    </div>
  )
}
