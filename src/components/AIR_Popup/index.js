'use client'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function AIR_Popup({ bt, Title, Main, w, opens }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  useEffect(() => { if (opens) setIsDrawerOpen(false) }, [opens]);

  return (
    <>
      <Box onClick={toggleDrawer(true)}>{bt}</Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: w === 1 ? '75vw' : w === 2 ? '50vw' : '0' },
        }}
      >
        <Box sx={{ width: '100%', justifyContent: 'start', height: '64px', alignItems: 'center', position: 'relative', display: 'flex', background: 'white' }} role="presentation">
          <Box className="Title_Popup" sx={{ ml: 2 }}>{Title}</Box>
        </Box>
        <Box sx={{ height: 'max-content', width: '100%', backgroundColor: 'vamColor.background', minHeight: 'calc(100vh - 64px)' }}>{Main}</Box>
      </Drawer>
    </>
  )
}