'use client';

import { useState } from 'react';
import Popup_Form from '@/utils/Extensions_UI/Popup_Form';
import Box from '@mui/material/Box';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import fetchApi from '@/utils/API_suport/fetchData';

export default function Task_Create({ dataType, dataProject, token, user }) {
  console.log(dataProject);
  
  const type = dataType.map(item => ({
    label: item.name,
    value: item.id
  }));

  const project = dataProject.map(item => ({
    label: item.name,
    value: item.id
  }));

  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    {
      type: 'select',
      name: 'project',
      label: 'Dự án',
      required: true,
      options: project,
    },
    {
      type: 'select',
      name: 'taskCategory',
      label: 'Loại công việc',
      required: true,
      options: type,
    },
    {
      type: 'input',
      name: 'Name',
      label: 'Tên công việc',
      required: true,
    },
    {
      type: 'date',
      name: 'startDate',
      label: 'Thời gian bắt đầu',
      required: true,
    },
    {
      type: 'date',
      name: 'endDate',
      label: 'Thời gian kết thúc',
    },
    {
      type: 'textarea',
      name: 'detail',
      label: 'Chi tiết công việc',
      required: true,
    },
    {
      type: 'textarea',
      name: 'notes',
      label: 'Ghi chú',
      required: true,
    },
    

  ];

  const handleSave = async (data) => {
    data.doer = user
    data.doerDone = false
    data.checkerDone = false
    setIsLoading(true)
    dataProject.forEach(e => {
      
    });
    dataProject.map(item => ({
      label: item.name,
      value: item.id
    }));
    // const response = await fetch('https://todo.tr1nh.net/api/task', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(body),
    // });
    setIsLoading(false)
  };

  return (
    <>
      <Box sx={{ width: 'max-content', height: '100%' }}>
        <Popup_Form
          button={
            <div className='flexCenter' style={{ height: 39, background: 'var(--main)', p: 0, borderRadius: 3, cursor: 'pointer', color: 'white', padding: '0 16px', gap: 8 }} >
              <AddBoxRoundedIcon sx={{ color: 'white', fontSize: 18 }} /> Thêm công việc
            </div>
          }
          title="Tạo công việc"
          fields={fields}
          onSave={handleSave}
        />
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
