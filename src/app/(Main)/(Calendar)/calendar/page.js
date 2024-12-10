import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FullCalendar from './fullCalendar'
import { cookies } from 'next/headers';
import Today from './today';

export default async function CalendarPage() {
  const accessToken = cookies().get('u')?.value;
  let today = new Date()

  let month = (today.getMonth() + 1).toString().padStart(2, '0')
  let toMonth = await fetch(`${process.env.URL}/api/getCalendarByMonth?month=${month}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    next: {
      revalidate: 10,
    }
  }).then(res => res.json()).catch(error => {
    console.error("Đã xảy ra lỗi:", error);
  });
  console.log(toMonth);

  return (
    <>
      <Grid container spacing={0} sx={{ m: 0, height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e6e8' }}>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <Box className="Wrap_Scroll" sx={{ height: '100%', background: 'white', borderRight: 'unset', overflow: 'hidden', overflowY: 'auto' }}>
            <section className="today-box" id="today-box">
              <span className="breadcrumb">Ngày hôm nay </span>
              <h3 className="date-title">Ngày {today.getDate()} tháng {month} năm {today.getFullYear()}</h3>
            </section>
            <Today />
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ height: '100%' }}><FullCalendar toMonth={month} token={accessToken} LessonToMonth={toMonth} /></Grid>
      </Grid>
    </>
  );
};
