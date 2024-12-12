'use client'

import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Wrap_table from './ui/Task_Read/Task_Wrap';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import Box from '@mui/material/Box';

export default function Task() {
  const [tabValue, setTabValue] = useState(0);
  let g = [[], [], []]

  return (
    <>
      <Grid container spacing={2} sx={{ m: 0 }}>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(0) }}>
            <Box_2_Student session='Tổng công việc'
              value={12} context='Tổng số công việc đã tạo' color='var(--main)' status={tabValue == 0 ? true : false} />
          </div>
          {/* <AssessmentRoundedIcon
            className='plus-icon'
            sx={{
              fontSize: 28,
              color: 'var(--main)',
              backgroundColor: "whitesmoke",
              borderRadius: "50%",
              padding: .8,
              border: `thin solid var(--main)`,
              transition: 'all .2s linear'
            }} /> */}
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(1) }}>
            <Box_2_Student session='Đã hoàn thành' value={g[0].length} context='Tổng số công việc đã hoàn thành' color='#38d200' status={tabValue == 1 ? true : false} />
          </div>
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(2) }}>
            <Box_2_Student session='Đang thực hiện' value={g[1].length} context='Tổng số công việc đang thực hiện' color='#f5a623' status={tabValue == 2 ? true : false} />
          </div>
        </Grid>
        <Grid xs={3} sx={{ position: 'relative' }}>
          <div onClick={() => { setTabValue(3) }}>
            <Box_2_Student session='Bị trễ' value={g[2].length} context='Tổng số công việc bị trễ' color='#d20000' status={tabValue == 3 ? true : false} />
          </div>
        </Grid>
        <Grid xs={12} sx={{ p: 1 }}><Wrap_table /></Grid>
      </Grid>
    </>
  );
}

function Box_2_Student({ session, value, context, color, status }) {
  return (
    <>
      <Box sx={{ borderRadius: 2, boxShadow: 'var(--box)', p: 2, bgcolor: 'white', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ position: 'relative', zIndex: 1, color: status ? 'white' : 'var(--text)' }}>
          <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', height: '100%', color: 'inherit' }}>
            <p className="text_4_m" style={{ color: 'inherit' }}> {session} </p>
            <p className="text_1_s" style={{ margin: '6px 0', color: 'inherit' }}>{value}</p>
            <p className="text_4_m" style={{ color: 'inherit' }}>{context}</p>
          </div>
        </Box>
        <div style={{ width: status ? '100%' : 5, background: `${color}`, position: 'absolute', top: 0, right: 0, height: '100%', zIndex: 0, transition: 'all .2s linear' }}></div>
      </Box>
    </>
  );
};