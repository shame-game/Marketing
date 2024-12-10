'use client'
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CalendarDay from '@/components/UI/(Celendar)/CalendarDay';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
// catching 
let cachedCalendars = {};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function parseDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Month trong JavaScript bắt đầu từ 0
}
// render
export default function FullCalendar({ LessonToMonth, token, toMonth }) {
  const [calendart, setcalendart] = useState({});
  let today = new Date()
  cachedCalendars[toMonth] = LessonToMonth.course
  let calendars = {}
  Object.keys(cachedCalendars[toMonth]).forEach(t => {
    const d1 = parseDate(formatDate(today))
    const d2 = parseDate(t)
    if (d1 <= d2) {
      calendars[t] = cachedCalendars[toMonth][t]
    }
  })

  const his = () => {
    setcalendart(cachedCalendars[toMonth])
  }
  const tod = () => {
    setcalendart(calendars)
  }
  useEffect(() => {
    setcalendart(calendars)
  }, [])
  const [month, setMonth] = useState(toMonth);
  const [calendar, setcalendar] = useState(LessonToMonth.course);
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState(LessonToMonth.user);
  const isFirstRender = useRef(true)
  const handleChange = (event) => setChecked(event.target.checked)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    async function fetchCourses() {
      try {
        if (cachedCalendars[month]) setcalendar(cachedCalendars[month])
        else {
          if (token) {
            const response = await fetch(`/api/getCalendarByMonth?month=${month}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            cachedCalendars[month] = data.course;
            setcalendar(data.course);
            setUser(data.user)
          }
        }
      } catch (error) { console.error('Error fetching courses:', error) }
    }
    fetchCourses();
  }, [month]);
  const handleMonthChange = (direction) => { setMonth(((parseInt(month) + direction) % 12 || 12).toString().padStart(2, '0')) };
  return (
    <>
      <Box sx={{ borderLeft: '1px solid #e5e6e8', height: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, backgroundColor: 'white', color: '#3b4056', borderBottom: '1px solid #e5e6e8', height: '36px' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #3b4056' }} className="flexCenter" onClick={() => handleMonthChange(-1)}>
              <KeyboardArrowLeftRoundedIcon />
            </Box>
            <Box sx={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #3b4056' }} className="flexCenter" onClick={() => handleMonthChange(1)}>
              <ChevronRightRoundedIcon />
            </Box>
          </Box>
          <div className="flexCenter Title_Popup">Tháng {month} năm {today.getFullYear()}</div>
          <FormControlLabel
            labelPlacement="start"
            control={<Switch checked={checked} onChange={handleChange} />}
            label='Tất cả'
          />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 63px)',
          overflow: 'hidden',
          overflowY: 'auto',
          backgroundColor: 'white',
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-track': { backgroundColor: 'vamColor.background' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#b9b9b9', borderRadius: '10px' }
        }}>
          {!calendart ? <>helo</> :
            <>{!checked ?
              <>{Object.keys(calendart).map((date) => (
                calendart[date].filter((lesson) => lesson.Teacher == user || lesson.TeachingAs == user).map(t =>
                  (<CalendarDay key={date} day={date} lesson={[t]} />)
                )))}</> :
              <>{toMonth != month ?
                <>{Object.keys(toMonth == month ? calendart : calendar).map((t) =>
                  (<CalendarDay key={t} day={t} lesson={toMonth == month ? calendart[t] : calendar[t]} />))}</> :
                <>{calendar == calendart ? <div onClick={tod} style={{ padding: '10px', cursor: 'pointer' }} className='flexCenter'>Xem hôm nay</div> :
                  <div onClick={his} style={{ padding: '10px', cursor: 'pointer' }} className='flexCenter'>Xem lịch cũ hơn</div>}
                  {Object.keys(toMonth == month ? calendart : calendar).map((t) =>
                    (<CalendarDay key={t} day={t} lesson={toMonth == month ? calendart[t] : calendar[t]} />))}</>}
              </>}
            </>}
        </Box>
      </Box>

    </>
  )
}