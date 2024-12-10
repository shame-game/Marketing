'use client'

import Box from '@mui/material/Box';
import TimeLine_Dot from '../TimeLine_Dot'
import Link from 'next/link';
import Course_editCalendar from '@/components/UI/(Course)/Course_editCalendar';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export default function AIR_BoxCourseLeft({ data, props }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>

      <Box className='After_CourseDetail' sx={{
        borderRadius: '8px', p: 2, background: 'linear-gradient(90deg, rgba(32,97,165,1) 0%, rgba(18,57,98,1) 100%)',
        boxShadow: 'var(--box)', position: 'sticky', top: 0, zIndex: 9, overflow: 'hidden',
      }}><Link href={`/course/${data.ID}`}>
          <Box className='Chip' sx={{ bgcolor: '#faa51d', color: 'white', fontWeight: '500', borderRadius: '4px' }}>{data.Type}</Box>
          <Box sx={{ fontSize: '28px', py: 1, fontWeight: '600', color: 'white' }}>Lớp: {data.ID}</Box>
          <Box sx={{ fontSize: '15px', color: 'white' }}>Từ {data.TimeStart} đến {data.TimeEnd}</Box>
        </Link>
        <Course_editCalendar icon={<div className="plus-icon"><EditCalendarIcon /></div>} data={data} />
      </Box>


      <Box sx={{
        flex: 1,
        overflow: 'hidden',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': { width: '5px' },
        '&::-webkit-scrollbar-track': { backgroundColor: 'vamColor.background' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#b9b9b9', borderRadius: '10px' }
      }}>
        {data.Detail.map((e, i) => (
          i == data.Detail.length - 1 ?
            <TimeLine_Dot key={i} props={props} course={data.ID} type="end" index={i} data={e} /> :
            i == 0 ? <TimeLine_Dot key={i} props={props} course={data.ID} type="center" index={i} data={e} /> :
              <TimeLine_Dot key={i} props={props} course={data.ID} type="main" index={i} data={e} />
        ))}
      </Box>
    </div>
  )
}

