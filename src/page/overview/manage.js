// import Box from "@mui/material/Box"
// import Student_Box from '@/components/UI/(Overview)/Student_Box1'
// import Chart_students from '@/components/UI/(Overview)/Chart_students'
// import Chart_stuArea from "@/components/UI/(Overview)/Chart_stuArea"
import Grid from "@mui/material/Grid"
import Chart_PayArea from '@/components/UI/(Overview)/Chart_PayArea'
import Chart_PayAreas from '@/components/UI/(Overview)/Chart_PayAreas'
import fetchApi from '@/utils/API_suport/fetchData';
import { getMon2, getToday } from '@/function'
export default async function Page_Overview_Manage() {
  let dataCourse;
  let dataInvoices;
  let dataStudent;
  let dataArea;
  try {
    dataCourse = await fetchApi('/Course_Read/all', { method: 'POST', body: JSON.stringify({ source: 1, overview: 1 }) });
    dataInvoices = await fetchApi('/Student_Tuition/r_Bill', { method: 'POST', body: JSON.stringify({ source: 1, overview: 1 }) });
    dataStudent = await fetchApi('/Student_Read/all', { method: 'POST', body: JSON.stringify({ source: 1, overview: 1 }) });
    dataArea = await fetchApi('/Area_Read/all', { method: 'POST', body: JSON.stringify({ source: 1 }) });
  } catch (error) { console.log(error) }
  // Tính toán doanh thu trong tháng hiện tại, so với tháng trước.
  let today = getToday()
  let html_m2 = ''
  let toMonth = getMon2(dataInvoices, today[1], today[2], dataArea)
  let gtoMonth = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0 // No decimals
  }).format(toMonth.reduce((sum, item) => sum + item.total, 0))

  let change = getPercentageChange(dataInvoices, today[1], today[2], dataArea);
  if (change === 0) {
    html_m2 = <>${svg_up}<p className="text_4_m">0% so với tháng trước</p></>
  } else {
    const sign = change > 0 ? '+' : '-';
    const icon = change > 0 ? svg_up : svg_down;
    html_m2 = <>{icon}<p className="text_4_m">{sign}{Math.abs(change)}% so với tháng trước</p></>
  }
  // Tính toán số khóa học tiện tại và tổng.
  let status = [0, 0]
  dataCourse.forEach(r => { r.Status ? status[0]++ : status[1]++ })

  let student = [0, 0]
  dataStudent.forEach(r => { r.Status == 'Đang học' ? student[0]++ : student[1]++ })

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={4} sx={{ height: '132px' }}>
          <div className="box_wrap" style={{ display: "flex", flexDirection: 'column', padding: 16, height: 'calc(100% - 32px)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="text_3_m">Số khóa học hiện tại</p>
              <p className="text_1" style={{ margin: '0 4px' }}>{status[1]} Khóa học</p>
              <p className="text_3" style={{ margin: '0 4px' }}>Tổng số khóa học: {status[1] + status[0]} khóa học</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sx={{ height: '132px' }}>
          <div className="box_wrap" style={{ display: "flex", flexDirection: 'column', padding: 16, height: 'calc(100% - 32px)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="text_3_m">Tổng học sinh đang học</p>
              <p className="text_1" style={{ margin: '0 4px' }}>{student[0]} Học sinh</p>
              <p className="text_3" style={{ margin: '0 4px' }}>Tổng số học sinh: {student[1] + student[0]} học sinh</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} sx={{ height: '132px' }}>
          <div className="box_wrap" style={{ display: "flex", flexDirection: 'column', padding: 16, height: 'calc(100% - 32px)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="text_3_m">Tổng học phí đã thu tháng {today[1]} năm {today[2]}</p>
              <p className="text_1" style={{ margin: '0 4px' }}>{gtoMonth}</p>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {html_m2}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Chart_PayArea invoices={dataInvoices} area={dataArea} />
        </Grid>
        <Grid item xs={8}>
          <Chart_PayAreas datai={dataInvoices} dataa={dataArea} />
        </Grid>
      </Grid>
    </>
  )
}

const svg_up = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >
    <path
      fill="#72e128"
      d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
      opacity=".5"
    />
    <path
      fill="#72e128"
      fillRule="evenodd"
      d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
      clipRule="evenodd"
    />
  </svg>)
const svg_down = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
  >\
    <path
      fill="red"
      d="M5 6.25a.75.75 0 0 0-.488 1.32l7 6c.28.24.695.24.976 0l7-6A.75.75 0 0 0 19 6.25z"
      opacity=".5"
    />
    <path
      fill="red"
      fillRule="evenodd"
      d="M4.43 10.512a.75.75 0 0 1 1.058-.081L12 16.012l6.512-5.581a.75.75 0 1 1 .976 1.139l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.058"
      clipRule="evenodd"
    />
  </svg>
)


function getPercentageChange(data, month, year, areas) {
  const currentTotals = getMon2(data, month, year, areas);
  const currentSum = currentTotals.reduce((sum, item) => sum + item.total, 0);
  let prevMonth = month - 1;
  let prevYear = year;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear = year - 1;
  }
  const previousTotals = getMon2(data, prevMonth, prevYear, areas);
  const previousSum = previousTotals.reduce((sum, item) => sum + item.total, 0)
  if (previousSum === 0) return 100;
  return ((currentSum - previousSum) / previousSum) * 100;
}

{/* <Grid item xs={8}>
          <Box sx={{ color: 'black', mb: '5px', fontSize: '20px' }}>Tổng học sinh:
            <span className="title" style={{ color: 'black', fontWeight: '500' }}> 12 học sinh</span>
          </Box>
          <Box sx={{ pt: '16px', display: 'flex', justifyContent: 'space-between', mr: '48px', alignItems: 'start', mb: 4 }}>
            <Student_Box id="svgStudentIn" color="#00bfae" background="#00bfae21" title="Học sinh đang học" quantity={12} />
            <Student_Box id="svgStudentTime" color="#ffb71c" background="#ffb71c21" title="Học sinh chờ lên khóa" quantity={12} />
            <Student_Box id="svgStudentOut" color="#f94b4b" background="#ffe8e8" title="Học sinh đã nghỉ" quantity="12" />
          </Box>
          <div style={{ padding: 8, borderRadius: 5, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', background: 'white' }}>
            <p className="text_2" style={{ padding: 8 }}>Bảng trạng thái tổng học sinh theo thời gian</p>
            <div style={{ padding: '0 8px 16px 8px', display: 'flex', gap: 16, justifyContent: 'start' }}>
              <div className='flexCenter' style={{ gap: 8 }}>
                <div className='dot' style={{ backgroundColor: '#00bfae' }}></div>
                <p className="text_4_m">Học sinh đang học</p>
              </div>
              <div className='flexCenter' style={{ gap: 8 }}>
                <div className='dot' style={{ backgroundColor: '#f94b4b' }}></div>
                <p className="text_4_m">Học sinh đã nghỉ</p>
              </div>
            </div>
            <Chart_students />
          </div>
        </Grid>
        <Grid item xs={4}><Chart_stuArea /> </Grid> */}