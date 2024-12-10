'use client'

import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box_2_Student from "@/components/UI/(Student)/Box_2";
import Wrap_table from '@/components/UI/(Student)/Wrap_table';
import { useStudentContext } from '@/context/student'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import Dialog from "@mui/material/Dialog";
import Box from '@mui/material/Box';
import As from '@/components/UI/(Student)/Chart';

export default function Task() {
  const [open, setopen] = useState(false)
  const handleClose = () => setopen(false)

  const { dataStudent, loading } = useStudentContext();
  const [tabValue, setTabValue] = useState(0);
  const [vpo, setvpo] = useState();
  if (loading) return <p>Loading data...</p>;

  let g = [[], [], []]
  dataStudent.forEach(element => {
    if (element.Status == 'Đang học') g[0].push(element)
    else if (element.Status == 'Chờ lên khóa') g[1].push(element)
    else if (element.Status == 'Đã nghỉ') g[2].push(element)
  });
  let loadID = (dataStudent.length + 1).toString().padStart(4, '0');
  loadID = 'AI' + loadID
  let h = dataStudent
  if (tabValue == 1) {
    h = dataStudent.filter(student => student.Status == 'Đang học')
  } else if (tabValue == 2) {
    h = dataStudent.filter(student => student.Status == 'Chờ lên khóa')
  } else if (tabValue == 3) {
    h = dataStudent.filter(student => student.Status == 'Đã nghỉ')
  }
  const test = () => {
    setopen(true)
    setvpo(dataStudent)
    if (tabValue == 1) {
      setvpo(dataStudent.filter(student => student.Status == 'Đang học'))
    } else if (tabValue == 2) {
      setvpo(dataStudent.filter(student => student.Status == 'Chờ lên khóa'))
    } else if (tabValue == 3) {
      setvpo(dataStudent.filter(student => student.Status == 'Đã nghỉ'))
    }
  }

  return (
    <>
      <Grid container spacing={2} sx={{ m: 0 }}>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(0) }}>
            <Box_2_Student session='Tổng học sinh'
              value={dataStudent.length} context='Tổng số học sinh hiện tại' color='var(--main)' status={tabValue == 0 ? true : false} />
          </div>
          <AssessmentRoundedIcon
            className='plus-icon'
            sx={{
              fontSize: 28,
              color: 'var(--main)',
              backgroundColor: "whitesmoke",
              borderRadius: "50%",
              padding: .8,
              border: `thin solid var(--main)`,
              transition: 'all .2s linear'
            }} onClick={() => {
              setvpo(dataStudent)
              setopen(true)
            }} />
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(1) }}>
            <Box_2_Student session='Đang học' value={g[0].length} context='Tổng số học sinh đang học hiện tại' color='#38d200' status={tabValue == 1 ? true : false} />
          </div>
          <AssessmentRoundedIcon
            className='plus-icon'
            sx={{
              fontSize: 28,
              color: '#38d200',
              backgroundColor: "whitesmoke",
              borderRadius: "50%",
              padding: .8,
              border: `thin solid #38d200`,
              transition: 'all .2s linear'
            }} onClick={() => {
              setvpo(dataStudent.filter(student => student.Status == 'Đang học'))
              setopen(true)
            }} />
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(2) }}>
            <Box_2_Student session='Chờ lên khóa' value={g[1].length} context='Tổng số học sinh chờ lên khóa hiện tại' color='#f5a623' status={tabValue == 2 ? true : false} />
          </div>
          <AssessmentRoundedIcon
            className='plus-icon'
            sx={{
              fontSize: 28,
              color: '#f5a623',
              backgroundColor: "whitesmoke",
              borderRadius: "50%",
              padding: .8,
              border: `thin solid #f5a623`,
              transition: 'all .2s linear'
            }} onClick={() => {
              setvpo(dataStudent.filter(student => student.Status == 'Chờ lên khóa'))
              setopen(true)
            }} />
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(3) }}>
            <Box_2_Student session='Đã nghỉ' value={g[2].length} context='Tổng số học sinh đã nghỉ hiện tại' color='#d20000' status={tabValue == 3 ? true : false} />
          </div>
          <AssessmentRoundedIcon
            className='plus-icon'
            sx={{
              fontSize: 28,
              color: '#d20000',
              backgroundColor: "whitesmoke",
              borderRadius: "50%",
              padding: .8,
              border: `thin solid #d20000`,
              transition: 'all .2s linear'
            }} onClick={() => {
              setvpo(dataStudent.filter(student => student.Status == 'Đã nghỉ'))
              setopen(true)
            }} />
        </Grid>
        <Grid xs={12} sx={{ p: 1 }}><Wrap_table dataStudent={h} s={loadID} /></Grid>
      </Grid>
      <Dialog
        fullWidth='sm'
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        className='Wrap_Scroll'>
        <Box>
          <Box className="Title_Popup" sx={{ p: 2, borderBottom: 'thin solid var(--background_1)' }}>Bảng thống kê học sinh theo khu vực</Box>
          <Box sx={{ p: 2 }}>
            <As datas={vpo} />
          </Box>
          <Box className="Title_Popup" sx={{ p: 2, borderTop: 'thin solid var(--background_1)', display: 'flex', justifyContent: 'center', gap: 2 }}>
            <div className='flexCenter' style={{ gap: 8 }}>
              <div className='dot' style={{ backgroundColor: '#ffab00' }}></div>
              <p className='text_4_m'>Biên Hòa</p>
            </div>
            <div className='flexCenter' style={{ gap: 8 }}>
              <div className='dot' style={{ backgroundColor: '#0096b1' }}></div>
              <p className='text_4_m'>Long Thành</p>
            </div>
            <div className='flexCenter' style={{ gap: 8 }}>
              <div className='dot' style={{ backgroundColor: '#007867' }}></div>
              <p className='text_4_m'>Long Khánh</p>
            </div>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

