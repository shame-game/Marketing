import LinearProgress from '@mui/material/LinearProgress'
import Link from 'next/link'
import vam from './index.module.css'

export default function AIR_BoxCourse({ data }) {
  let today = new Date()
  const currentHour = new Date().getHours();
  let p = 0
  let Progress = 0
  data.Detail.forEach(e => {
    Progress += e.Lesson
    let day = new Date(`${e.Day.slice(6)}` + '/' + `${e.Day.slice(3, 5)}` + '/' + `${e.Day.slice(0, 2)}`)
    if (today > day) p += e.Lesson
    else if (today == day) if (e.Time.slice(6, 8) < currentHour) p += e.Lesson
  });
  return (
    <>
      <Link href={`/course/${data.ID}`} >
        <div className={vam.wrap}>
          <div className={vam.title}>
            <div className={vam.courseAvt}>{data.ID.slice(2,5)}</div>
            <div style={{ flex: 1 }}>
              <div className={vam.title_text1}>{data.ID}
                <p className='Chip' style={{ background: 'var(--bienhoa_b)', color: 'var(--bienhoa_m)', fontSize: '14px' }}>{data.Area}</p>
              </div>
              <p style={{ color: 'var(--text_400)', fontSize: '14px', fontWeight: 500 }}>{data.Name}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <span style={{ color: 'var(--text)' }}>Thời gian: </span>
            <span style={{ color: 'var(--text_400)' }}>  {data.TimeEnd} - {data.TimeStart}</span>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <span style={{ color: 'var(--text)' }}>Số lượng học sinh: </span>
            <span style={{ color: 'var(--text_400)' }}> {data.Student.length} Học sinh</span>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <span style={{ color: 'var(--text)' }}>Tiến độ học: </span>
            <span style={{ color: 'var(--text_400)' }}> {p}/{Progress} Tiết</span>
          </div>
          <LinearProgress
            variant="determinate"
            value={p / Number(Progress) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#E6E8F0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: '#3366FF'
              }
            }}
          />
        </div>
      </Link >
    </>
  )
}
