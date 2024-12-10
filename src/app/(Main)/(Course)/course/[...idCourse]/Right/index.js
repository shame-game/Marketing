import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import Course_addStudent from '@/components/UI/(Course)/Course_addStudent'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import Image from "next/image";
import CommentOAI from "@/components/UI/(Course)/CommentOAI";
import AIR_BoxFile from "@/components/UI/(All)/AIR_BoxFile";
import Notice from "@/components/UI/(Course)/Course_notice";
import Course_confirm from "@/components/UI/(Course)/Course_confirm";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';

export default function AIR_BoxCourseRight({ props, data, student }) {

  let today = new Date()
  const currentHour = new Date().getHours();
  let p = 0
  data.Detail.forEach(e => {
    let day = new Date(`${e.Day.slice(6)}` + '/' + `${e.Day.slice(3, 5)}` + '/' + `${e.Day.slice(0, 2)}`)
    if (today > day) p++
    else if (today == day) if (e.Time.slice(6, 8) < currentHour) p++
  });

  let lesson = data.Detail.filter(item =>
    item.Student ? `${item.ID}-${formatDate(item.Day)}` === props : item.ID === props
  );
  let s
  s = data.Detail.length == p ? true : false


  return (
    <Box sx={{
      width: '100%', height: 'calc(100% - 32px)', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      borderRadius: '6px', overflow: 'hidden', overflowY: 'scroll', p: 2,
      '&::-webkit-scrollbar': { width: '5px' },
      '&::-webkit-scrollbar-track': { backgroundColor: 'white' },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#b9b9b9', borderRadius: '10px' }
    }}>
      {!props ?
        <Box className='Befor_CourseDetail' sx={{ position: ' relative' }}>
          <Box sx={{ p: 1 }}>
            <div style={{
              padding: 16, background: 'white', position: 'relative', borderRadius: 4, border: '2px solid #f1f1f1',
              display: 'flex', justifyContent: 'space-between', zIndex: 1
            }}>
              <Box sx={{}}>
                <Box className="Title_Popup" sx={{ mb: 2 }}>Thông tin cơ bản</Box>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', mb: 2 }}>
                  <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: '2px' }}><CollectionsBookmarkRoundedIcon sx={{ color: '#707483' }} />Chương trình học: {data.Name}</Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: '2px' }}><SchoolRoundedIcon sx={{ color: '#707483' }} />Số học sinh: {data.Student.length} học sinh</Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: '2px' }}><TodayRoundedIcon sx={{ color: '#707483' }} />Buổi học: {data.Detail.length} buổi</Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: '2px' }}><EventAvailableRoundedIcon sx={{ color: '#707483' }} />Đã học: {p} buổi</Box>
                    <Course_confirm status={s} id={data.ID} student={data.Student.map(item => item.ID)} stcourse={data.Status} />
                  </Grid>
                </Grid>
              </Box>
              <Image src='https://lh3.googleusercontent.com/d/1TuuQWKJlTW8rvG1u7D2LzkgYhEXL51Dy' style={{
                height: '100%', objectFit: 'cover',
                borderRadius: '4px', width: 'auto'
              }} alt="Image"
                width={100} height={100} priority />
            </div>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', border: '2px solid #f1f1f1', borderRadius: '4px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #f1f1f1' }}>
                <Box className="Title_Popup" >Học sinh</Box>
                {student ? <Course_addStudent data={student.allStudent} un={data.Student} course={data._id} /> : null}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f1f1', p: 1, background: '#f1f1f1' }}>
                {header_.map(t => (<Box key={t.title} sx={{ flex: `${t.size}`, justifyContent: `${t.align}`, display: 'flex', p: 1 }}>{t.title}</Box>))}
              </Box>
              <Box>
                {data.Student.map(async (t) => {
                  let studentStatus = await fetch(`${process.env.URL}/api/GetCourseOfStudent?ID=${t.ID}&Course=${data.ID}`)
                  let dataStudent = await studentStatus.json()
                  data = (!typeof (dataStudent.StatusPay) == 'number' ? <CheckBoxRoundedIcon sx={{ color: "#028a68" }} /> : <DisabledByDefaultRoundedIcon sx={{ color: "#a32121" }} />)
                  return (
                    <Box key={t.ID} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f1f1', py: .5, px: 1 }}>
                      <Box sx={{ flex: `2`, justifyContent: `start`, display: 'flex', p: 1 }}>{t.Name}</Box>
                      <Box sx={{ flex: `2`, justifyContent: `center`, display: 'flex', p: 1 }}></Box>
                      <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>{Object.values(t.Learn).filter(item => item.Checkin == 1 || item.Checkin == '1').length}</Box>
                      <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>{Object.values(t.Learn).filter(item => item.Checkin == 2 || item.Checkin == '2').length}</Box>
                      <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>{Object.values(t.Learn).filter(item => item.Checkin == 3 || item.Checkin == '3').length}</Box>
                      <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>
                        <Tooltip title="Hồ sơ điện tử">
                          <div >
                            <Link href={`https://eportfolio.airobotic.edu.vn/Student?ID=${t.ID}`} className='flexCenter' target="_blank">
                              <AssignmentIndIcon sx={{ color: 'var(--icon_1)' }} />
                            </Link>
                          </div>
                        </Tooltip>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box >
          </Box>
        </Box> :
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box className="Title_Popup" sx={{ display: 'flex', mb: 1, fontSize: '24px !important' }}>{lesson[0].ID}: {lesson[0].Topic}
              {lesson[0].Student ? <p className="Chip text_4_m" style={{ background: '#bd3636', color: 'white', marginLeft: 8 }}>Buổi bù</p> : null}
            </Box>
          </Box>
          <Box className="Title_Popup" sx={{ paddingBottom: '16px' }}>{data.Type} - {data.Name}</Box>
          <p className="text_3_m">Số tiết trong buổi học: <span style={{ fontWeight: '600' }}>{lesson[0].Lesson} tiết</span></p>
          <p className="text_3_m">Thời gian:  <span style={{ fontWeight: '600' }}>{lesson[0].Time} Ngày {lesson[0].Day}</span></p>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', borderRadius: 2, p: 1, bgcolor: 'var(--main)', color: 'white', width: 'max-content' }}>
            <Box sx={{ borderRight: '1px solid white', ml: 2, pr: 2 }}>Giáo viên giảng dạy:  <span style={{ fontWeight: '600' }}>{lesson[0].Teacher}</span></Box>
            <Box sx={{ ml: 2, pr: 2 }}>Trợ giảng:  <span style={{ fontWeight: '600' }}>{lesson[0].TeachingAs ? lesson[0].TeachingAs : 'Không có trợ giảng'}</span></Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
            <Box className="Title_Popup" sx={{ mb: 1 }}>Học sinh</Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #c9c9c9' }}>
              {header.map(t => (<Box key={t.title} sx={{ flex: `${t.size}`, justifyContent: `${t.align}`, display: 'flex', p: 1 }}>{t.title}</Box>))}
            </Box>
            <Box>
              {data.Student.map((t, index) => {
                let s = data.Student[index].Learn[lesson[0].ID]

                return (
                  <Box key={t.ID} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #c9c9c9', py: 1 }}>
                    <Box sx={{ flex: `2`, justifyContent: `start`, display: 'flex', p: 1 }}>{t.Name}</Box>
                    <Box sx={{ flex: `2`, justifyContent: `center`, display: 'flex', p: 1 }}></Box>
                    <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>
                      {s.Checkin == 1 ? <RadioButtonCheckedRoundedIcon sx={{ color: 'green' }} /> : <RadioButtonCheckedRoundedIcon sx={{ color: '#d2d2d2' }} />}</Box>
                    <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>
                      {s.Checkin == 2 ? <RadioButtonCheckedRoundedIcon sx={{ color: 'red' }} /> : <RadioButtonCheckedRoundedIcon sx={{ color: '#d2d2d2' }} />}</Box>
                    <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1 }}>
                      {s.Checkin == 3 ? <RadioButtonCheckedRoundedIcon sx={{ color: '#e0bf0f' }} /> : <Notice id={t.ID} lesson={lesson[0].ID} course={data._id} data={s} />}</Box>
                    <Box sx={{ flex: `1`, justifyContent: `center`, display: 'flex', p: 1, cursor: 'pointer' }}>
                      <CommentOAI id={t.ID} data={s} s={lesson.concat(data.ID)} />
                    </Box>
                  </Box>
                )
              }
              )}
            </Box>
          </Box >
          <Box style={{ py: '25px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
              <Box className="Title_Popup" sx={{ mb: 1 }}>Tài nguyên</Box>
            </Box>
            <div style={{ width: 200 }}>
              <AIR_BoxFile type="Image" name="Hình ảnh" href={'https://drive.google.com/drive/folders/' + lesson[0].Image} />
            </div>
          </Box>
        </Box>
      }
    </Box >
  )
}

const header_ = [
  { title: 'Họ và Tên', size: '2', align: 'start' },
  { title: '', size: '2', align: 'center' },
  { title: 'Có mặt', size: '1', align: 'center' },
  { title: 'Không phép', size: '1', align: 'center' },
  { title: 'Có phép', size: '1', align: 'center' },
  { title: 'Học phí', size: '1', align: 'center' }
]
const header = [
  { title: 'Họ và Tên', size: '2', align: 'start' },
  { title: '', size: '2', align: 'center' },
  { title: 'Có mặt', size: '1', align: 'center' },
  { title: 'Không phép', size: '1', align: 'center' },
  { title: 'Có phép', size: '1', align: 'center' },
  { title: 'Ghi chú', size: '1', align: 'center' }
]

function formatDate(dateStr) {
  let [day, month, year] = dateStr.split('/');
  return `${year}${month}${day}`;
}