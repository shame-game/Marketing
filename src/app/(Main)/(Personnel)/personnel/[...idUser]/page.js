

import Box from '@mui/material/Box';
import fetchApi from '@/utils/API_suport/fetchData';
import Profile_Banner from './component/banner';
import Grid from '@mui/material/Unstable_Grid2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default async function _idCourse() {
  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 88px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <p className='text_3'>Ngày 20/10/2021</p>
          <div style={{ height: 2, flex: 1, background: 'var(--background_1)' }}></div>
        </div>
        <div style={{ height: 200, width: '80%', marginLeft: 'auto', background: 'red' }}>

        </div>
        <div style={{ height: 200, width: '80%', marginLeft: 'auto', background: 'red' }}>

        </div>
      </div>
    </Box>
  );
};
