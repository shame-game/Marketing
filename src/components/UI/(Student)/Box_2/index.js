"use client";
import Box from "@mui/material/Box";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import vam from './index.module.css'

export default function Box_2_Student({ session, value, context, color, status }) {
  const [v, setv] = useState()


  const test = async () => {
    if (session == 'Tổng học sinh') {
      let res = await fetch(`/api/getStudent/all`);
      let data = await res.json()
      setv(data)
    }
    else {
      let res = await fetch(`/api/getStatus_S?status=${session}`);
      let data = await res.json()
      setv(data)
    }
  }

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
      {/*
      <Dialog
        fullWidth='sm'
        maxWidth='sm'
        open={open}
        onClose={handleClose}>
        <Box>
          <Box className="Title_Popup" sx={{ p: 2, borderBottom: 'thin solid var(--background_1)' }}>Thống kế {session}</Box>

          <Box sx={{ p: 2 }}>
            hi
          </Box>
        </Box>
      </Dialog>
     */ }
    </>

  );
};
