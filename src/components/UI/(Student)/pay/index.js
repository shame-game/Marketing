
'use client'

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Tooltip from '@mui/material/Tooltip';
import CheckPay from '../checkpay';

export default function Pay({ data, bt }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div onClick={handleClickOpen}>{bt} </div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        onClose={() => setOpen(false)}
        open={open}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
          <p className='text_2_m'>Học phí</p>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ color: 'var(--icon_1)' }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', width: 'calc(100% - 16px)', gap: 8, padding: '16px 8px', background: 'var(--main)' }}>
          <p className='text_3' style={{ flex: 1, color: 'white', textAlign: 'center' }}>Tên khóa học</p>
          <p className='text_3' style={{ flex: 1, color: 'white', textAlign: 'center' }}>Trạng thái học</p>
          <p className='text_3' style={{ flex: 1, color: 'white', textAlign: 'center' }}>Nợ học phí</p>
          <p className='text_3' style={{ flex: 1, color: 'white', textAlign: 'center' }}>Hành động</p>
        </div>
        {data.Course ?
          Object.keys(data.Course).map(t => (
            <div key={t} style={{ display: 'flex', width: 'calc(100% - 16px)', gap: 8, padding: '16px 8px', alignItems: 'center' }}>
              <p className='text_3_m' style={{ flex: 1, textAlign: 'center' }}>{t}</p>
              <div className='text_3_m flexCenter' style={{ flex: 1, textAlign: 'center', gap: 8 }}>
                <div className='dot' style={{ background: data.Course[t].StatusLearn ? 'green' : 'red' }}></div>
                {data.Course[t].StatusLearn ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</div>
              <p className='text_3_m' style={{ flex: 1, textAlign: 'center' }}>{typeof (data.Course[t].StatusPay) == 'string' ?
                '0 vnđ' : new Intl.NumberFormat('de-DE').format(data.Course[t].StatusPay) + ' vnđ'}</p>
              <div style={{ flex: 1 }} className='flexCenter'>
                {typeof(data.Course[t].StatusPay) == 'string' ?
                  <><AssignmentTurnedInIcon sx={{ color: 'green' }} /></>
                  : <CheckPay data={data.Course[t]} nameCourse={t} name={data} bt={
                    <Tooltip title="Xác nhận học phí" >
                      <div style={{
                        width: 35,
                        height: 35,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}><AssignmentTurnedInIcon /></div>
                    </Tooltip>} />}
              </div>
            </div>
          )) : <p className='text_3' style={{ padding: '16px 8px', textAlign: 'center' }}>không có khóa học nào</p>
        }
      </Dialog >
    </>
  );
}