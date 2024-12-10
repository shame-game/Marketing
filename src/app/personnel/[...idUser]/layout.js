import Box from '@mui/material/Box';
import fetchApi from '@/utils/API_suport/fetchData';
import Profile_Banner from './component/banner';
import Grid from '@mui/material/Unstable_Grid2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default async function _idCourse({ params, children }) {
  const { idUser } = params;
  let data;
  try {
    data = await fetchApi('/User_Read/one', { method: 'POST', body: JSON.stringify({ source: 1, ID: idUser }) })
  } catch (error) { data = null }

  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 88px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Profile_Banner data={data} />
      <Grid container spacing={0} sx={{ width: '90%', margin: '0 auto' }}>
        <Grid xs={12} md={4} lg={4} sx={{ height: '100%', p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div className='box_wrap' style={{ padding: '16px 8px', display: 'flex' }}>
            <div style={{ flex: 1, gap: 6, flexDirection: 'column' }} className='flexCenter'>
              <p className='text_1'>12</p>
              <p className='text_4'>Số tiết đã dạy</p>
            </div>
            <div style={{ height: 70, width: 1, background: 'var(--background_1)' }}></div>
            <div style={{ flex: 1, gap: 6, flexDirection: 'column' }} className='flexCenter'>
              <p className='text_1'>12</p>
              <p className='text_4'>Số khóa chủ nhiệm</p>
            </div>
          </div>
          <div className='box_wrap' style={{ padding: '16px' }}>
            <p className='text_3' style={{ paddingBottom: 8 }}>Thông tin</p>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p className='flexCenter' style={{ width: 'max-content', gap: 8, margin: '4px 0' }}>
                <EmailRoundedIcon sx={{ color: 'var(--text)' }} />
                {data.Email}
              </p>
              <p className='flexCenter' style={{ width: 'max-content', gap: 8, margin: '4px 0' }}>
                {icon_phone}
                {data.Phone}
              </p>
              <p className='flexCenter' style={{ width: 'max-content', gap: 8, margin: '4px 0' }}>
                <HomeRoundedIcon sx={{ color: 'var(--text)' }} />
                {data.Address}
              </p>
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={8} lg={8} sx={{ height: '100%' }}>
          <div style={{ marginLeft: 16 }}>
            {children}
          </div>
        </Grid>
      </Grid>
    </Box>
  );

};

const icon_phone = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={19} height={19} fill='var(--text)' style={{ marginLeft: 3 }}>
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
  </svg>
)