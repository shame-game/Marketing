'use client';

import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export default function Task_Read_List({ student }) {
  const [page, setPage] = useState(1);
  const studentsPerPage = 7;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastStudent = page * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = student.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <Box sx={{ width: '100%' }}>
      {currentStudents.map((student, index) => (
        <UI_Student_List key={index} data={student} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, borderTop: 'thin solid var(--background_1)' }}>
        <Pagination
          count={Math.ceil(student.length / studentsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
}

function UI_Student_List({ data }) {
  return (
    <Box
      sx={{
        height: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        py: '10px',
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'var(--background_1)',
        textDecoration: 'none'
      }}
    >
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
        <p>{data.Project}</p>
      </Box>
      <Box sx={{ flex: '2', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
        <p>{data.Task}</p>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        <p>{data.Start}</p>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        <p>{data.End}</p>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        <p>{data.Detail}</p>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        <p>{data.Status}</p>
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', justifyContent: 'center', fontWeight: '500', gap: 1 }}>
        <Tooltip title="Sửa công việc"> <div className='iconWrap'>{edit}</div> </Tooltip>
        <Tooltip title="Xóa công việc"> <div className='iconWrap'>{del}</div> </Tooltip>
      </Box>
    </Box >
  )
}

const edit = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} fill='var(--icon_1)'>
    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" /></svg>
)

const del = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} fill='var(--icon_1)'>
    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" /></svg>
)

