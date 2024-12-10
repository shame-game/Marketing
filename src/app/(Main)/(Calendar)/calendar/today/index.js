'use client'
import CalendarCourse from '@/components/UI/(Celendar)/CalendarCourse'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Today() {
  const [data, setdata] = useState()
  let today = new Date()
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`/api/getCalendarByDay?day=${formatDate(today)}`);
        const dt = await response.json();
        setdata(dt)
      } catch (error) { console.error('Error fetching courses:', error) }
    }
    fetchCourses();
  }, []);

  return (
    <>
      {data ?
        (<>
          <Box sx={{ mt: 3, px: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box className="Title_Popup" sx={{ color: 'vamColor.main' }}>Lịch dạy hôm nay</Box>
            <Box sx={{ height: '2px', bgcolor: '#BBDEFB', flex: 1, mt: '2px' }}></Box>
          </Box>
          {data.map((t, index) => (<CalendarCourse key={index} data={t} />))}
        </>) :
        <Box sx={{ width: '100%', flexDirection: 'column', gap: 1 }} className="flexCenter">
          <img src='https://lh3.googleusercontent.com/d/1cPhk1HYk-9qS9Vs_6ls3WGVpyuxb_v-o' alt="No Events" style={{ width: '40%', objectFit: 'cover' }} />
          <p>Không có lịch dạy hôm nay</p>
        </Box>
      }
    </>
  )
}