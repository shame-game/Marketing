'use client';

import { useState } from 'react';
import Popup_Form from '@/utils/Extensions_UI/Popup_Form';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function Task_Update({ dataType, dataProject, token, button, data, project, type }) {
  const types = dataType.map(item => ({
    label: item.name,
    value: item.id
  }));

  const projects = dataProject.map(item => ({
    label: item.name,
    value: item.id
  }));
  projects.forEach(e => {
    if (e.label == project) project = e
  });
  types.forEach(e => {
    if (e.label == type) type = e
  });

  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    // {
    //   type: 'select',
    //   name: 'project',
    //   label: 'Dự án',
    //   required: true,
    //   defaultValue: project.value,
    //   options: projects
    // },
    {
      type: 'input',
      name: 'name',
      label: 'Tên công việc',
      defaultValue: data.name,
      required: true,
    },
    {
      type: 'select',
      name: 'taskCategory',
      label: 'Loại công việc',
      required: true,
      defaultValue: type.value,
      options: types,
    },

    {
      type: 'date',
      name: 'startDate',
      label: 'Thời gian bắt đầu',
      defaultValue: data.startDate.split('T')[0],
      required: true,
    },
    {
      type: 'date',
      name: 'endDate',
      label: 'Thời gian kết thúc',
      defaultValue: data.endDate.split('T')[0],
      required: true,
    },
    {
      type: 'textarea',
      name: 'detail',
      label: 'Chi tiết công việc',
      defaultValue: data.detail,
      required: true,
    },
    {
      type: 'textarea',
      name: 'notes',
      defaultValue: data.notes,
      label: 'Ghi chú',
    },


  ];

  const handleSave = async (datas) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://todo.tr1nh.net/api/task/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(datas),
      });
      setIsLoading(false);
      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Đã xảy ra lỗi: ${errorData.mes || errorData.message || 'Không xác định'}`);
      }
    } catch (error) {
      setIsLoading(false);
      alert(`Đã xảy ra lỗi: ${error.message}`);
    }
  };

  return (
    <>
      <Box sx={{ width: 'max-content', height: '100%' }}>
        <Popup_Form
          button={button}
          title="Sửa thông tin công việc"
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
