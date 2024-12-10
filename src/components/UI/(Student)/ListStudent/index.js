'use client';

import { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import UI_Student_List from './UI_Student'

export default function CustomPaginationActionsTable({ student }) {
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
      {currentStudents.map((student) => (
        <UI_Student_List key={student.ID} data={student} />
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