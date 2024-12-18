'use client';

import { useState } from 'react';
import Popup_Form from '@/utils/Extensions_UI/Popup_Form';
import Box from '@mui/material/Box';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function Project_Create() {
  const [isLoading, setIsLoading] = useState(false);
  const fields = [
    {
      type: 'input',
      name: 'name',
      label: 'Tên dự án',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      label: 'Mô tả dự án'
    },
    {
      type: 'input',
      name: 'department',
      label: 'Phòng ban',
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
      required: true,
    },
    {
      type: 'areatext',
      name: 'notes',
      label: 'Ghi chú',
      required: true,
    },
    {
      type: 'select',
      name: 'piority',
      label: 'Sự ưu tiên',
      required: true,
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
  ];

  const handleSave = async (data) => {
    setIsLoading(true)
    console.log(data);
    setIsLoading(false)
  };

  return (
    <>
      <Box sx={{ width: 'max-content', height: '100%' }}>
        <Popup_Form
          button={
            <div className='flexCenter' style={{ height: 39, background: 'var(--main)', p: 0, borderRadius: 3, cursor: 'pointer', color: 'white', padding: '0 16px', gap: 8 }} >
              <AddBoxRoundedIcon sx={{ color: 'white', fontSize: 18 }} /> Thêm dự án
            </div>
          }
          title="Tạo dự án"
          fields={fields}
          onSave={handleSave}
        />
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 99 }}
        open={isLoading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
