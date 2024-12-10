'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: false,
    },

    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.restore();
      ctx.font = `16px`;
      ctx.textBaseline = 'middle';

      const total = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);
      const text = total.toLocaleString();
      ctx.fillText(text);
      ctx.save();
    },
  },
};

export default function Chart_PayArea({ invoices, area }) {
  invoices = calculateTotalByArea(invoices)
  const c = new Array(area.length).fill(0);
  const d = [];
  const f = [];

  const amountMapping = invoices.reduce((map, item) => {
    map[item.Area] = item.totalAmount;
    return map;
  }, {});

  area.forEach((location, index) => {
    const areaName = location.Name;
    const areaColor = location.Color;
    d.push(areaColor);
    c[index] = amountMapping[areaName] || 0;
    f.push({ Area: areaName, Color: areaColor });
  });

  const data = {
    datasets: [
      {
        data: c,
        backgroundColor: d,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className='box_wrap' >
      <div style={{ padding: 16 }}>
        <p className='text_2'>Tổng nguồn thu theo khu vực</p>
      </div>
      <div className='flexCenter' style={{ padding: '16px 0' }}>
        <div style={{ width: '60%', height: 'auto', aspectRatio: 1 / 1 }} >
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <div style={{ borderTop: '1px dashed #d0d0d0', padding: 16, display: 'flex', gap: 16, justifyContent: 'center' }}>
        {f.map((t, index) => (
          <div key={index} className='flexCenter' style={{ gap: 8 }}>
            <div className='dot' style={{ backgroundColor: `${t.Color}` }}></div>
            <p>{t.Area}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


function calculateTotalByArea(invoices) {
  const totalsByArea = invoices.reduce((acc, invoice) => {
    const address = invoice.courseData?.Area || 'Unknown';
    if (!acc[address]) {
      acc[address] = 0;
    }
    acc[address] += invoice.Amount_paid;
    return acc;
  }, {});
  return Object.entries(totalsByArea).map(([address, totalAmount]) => ({
    Area: address,
    totalAmount,
  }));
}