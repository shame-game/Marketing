'use client'

import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import vam from './index.module.css'
import UpdateStudent from '@/components/UI/(Student)/updateStudent';
import Pay from '@/components/UI/(Student)/pay';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function UI_Student_List({ data }) {
  let [open, setopen] = useState(false)
  let pay = 0
  if (data.Course) {
    Object.keys(data.Course).forEach(r => {
      if (typeof (data.Course[r].StatusPay) == 'string') pay = pay
      else pay += data.Course[r].StatusPay
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setopen(false)
  };

  const noneProfile = () => setopen(true)
  pay = new Intl.NumberFormat('de-DE').format(pay) + ' vnđ'
  return (
    <Box
      sx={{
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        py: '10px',
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'var(--background)',
        textDecoration: 'none'
      }}
    >
      <Box sx={{ flex: '.3', display: 'flex', alignItems: 'center' }}>
        <Link href={`/student/${data.ID}`}>
          <Avatar alt={data.name} src={data.Avt} />
        </Link>
      </Box>
      <Box sx={{ flex: '.5', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
        {data.ID}
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        <div className='dot' style={{
          background: data.Status == 'Đang học' ? '#38d200' :
            data.Status == 'Chờ lên khóa' ? '#f5a623' :
              data.Status == 'Đã nghỉ' ? '#d20000' : 'var(--background_2)'
          , marginRight: 8
        }}></div>{data.Name}
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        {data.Phone ? data.Phone : <>Trống</>}
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}>
        {data.Area ? data.Area : <>Trống</>}
      </Box>
      <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500' }}> {pay} </Box>
      <Box sx={{ flex: '.5', display: 'flex', alignItems: 'center', color: 'var(--text)', fontWeight: '500', gap: 1 }}>
        <Tooltip title="Hồ sơ điện tử">
          <div className={vam.iconWrap}>
            {data.Profile ?
              <Link href={`https://eportfolio.airobotic.edu.vn/Student?ID=${data.ID}`} className='flexCenter' target="_blank">
                <AssignmentIndIcon sx={{ color: 'var(--icon_1)' }} />
              </Link> :
              <div className='flexCenter' onClick={noneProfile}>
                <AssignmentIndIcon sx={{ color: 'red' }} />
              </div>}
          </div>
        </Tooltip>
        <Tooltip title="Chi tiết">
          <div className={vam.iconWrap}>
            <Link href={`/student/${data.ID}`} className='flexCenter'>{svg_eye}</Link>
          </div>
        </Tooltip>
        <UpdateStudent data={data} bt={<Tooltip title="Sửa thông tin"> <div className={vam.iconWrap}>{edit}</div> </Tooltip>} />
        <Pay data={data} bt={<Tooltip title="Học phí"> <div className={vam.iconWrap}>{mon}</div> </Tooltip>} />
      </Box>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Học sinh {data.Name} chưa có hồ sơ điện tử
        </Alert>
      </Snackbar>
    </Box >
  )
}


const svg_eye = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20} fill='var(--icon_1)'>
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
)

const edit = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} fill='var(--icon_1)'>
    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" /></svg>
)

const mon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} height={20} fill='var(--icon_1)'>
    <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 144zM80 352c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 336c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 240z" /></svg>
)

