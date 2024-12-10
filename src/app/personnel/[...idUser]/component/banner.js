'use client';

import { Box, Avatar, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

export default function Profile_Banner({ data }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 2,
        margin: '0 auto',
        boxShadow: 'var(--box)',
        height: '250px'
      }}
    >
      <Box
        sx={{
          borderRadius: '8px 8px 0 0',
          height: 200,
          background: 'url(https://wallpapers.com/images/hd/elegantly-dark-navy-blue-background-ida2go5gk0suip26.jpg) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div style={{ bottom: -24, left: 64, position: 'absolute', display: 'flex', gap: 32 }}>
            <Avatar src={data ? data.Avt ? data.Avt : '' : ''} alt={data.Name.split(' ')[data.Name.split(' ').length - 1]} sx={{
              width: 110,
              height: 110,
              border: '3px solid #fff',
            }}
            />
            <div style={{ margin: '28px 0 0 0' }}>
              <p className='text_2' style={{ color: 'white', marginBottom: 4 }}>{data.Name}</p>
              <p className='text_3_m' style={{ color: 'white' }}>{Object.keys(data.Role)[0]}</p>
            </div>
          </div>
        </div>
      </Box>

      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          width: 'max-content',
          marginLeft: 'auto'
        }}
      >
        <Tab label="Hành động" />
        <Tab label="Chủ nhiệm" />
      </Tabs>
    </Box>
  );
}
