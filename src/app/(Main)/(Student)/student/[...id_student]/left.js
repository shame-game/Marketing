import { Box, Avatar, Typography, Divider } from '@mui/material';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import UpdateStudent from '../../../../../components/UI/(Student)/updateStudent'
export default function Left({ children }) {
  console.log(children);

  return (
    <Box sx={{ backgroundColor: 'white', p: 2, py: 3, pb: 4, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: '5px', boxShadow: 'var(--box)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, my: 3 }}>
        <Avatar
          src={children.Avt}
          alt={children.Name}
          sx={{ width: 80, height: 80, mb: 1 }}
        />
        <Typography variant="h6" fontWeight="bold">{children.Name}</Typography>
        <Typography variant="body2" color="text.secondary">ID: {children.ID}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <div style={{ display: 'flex', alignItems: 12, justifyContent: 'space-between' }}>
          <p className='text_3' style={{ paddingBottom: 8 }}>Thông tin học sinh</p>
          <UpdateStudent data={children} bt={<CreateRoundedIcon sx={{ fontSize: 20, cursor: 'pointer' }} />} />
        </div>
        <Box sx={{
          width: 'max-content',
          backgroundColor: 'vamColor.main',
          borderRadius: '3px',
          p: '7px 15px',
          border: 'thin solid',
          borderColor: '#d3d5d7',
          width: 'calc(100% - 32px)'
        }}>
          <Typography
            variant="subtitle2"
            sx={{
              width: 'max-content',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <p style={{ margin: 0, marginTop: '3px' }} className='text_3_m'><span className='text_3'>Ngày sinh:</span> {children.BD}</p>
            <p style={{ margin: 0, marginTop: '3px' }} className='text_3_m'><span className='text_3'>Trường học:</span> {children.School ? children.School : 'Trống'}</p>
            <p style={{ margin: 0, marginTop: '3px' }} className='text_3_m'><span className='text_3'>Loại học sinh:</span> {children.Type ? children.Type : 'Trống'}</p>
            <p style={{ margin: 0, marginTop: '3px' }} className='text_3_m'><span className='text_3'>Trạng thái:</span> {children.Status ? children.Status : 'Trống'}</p>
            <p style={{ margin: 0, marginTop: '3px' }} className='text_3_m'>
              <span className='text_3'>Khóa học tham gia:</span> {children.Course ?
                Object.keys(children.Course).length ? Object.keys(children.Course).length : 0 : null} khóa
            </p>
          </Typography>
        </Box>
      </Box>
    </Box >
  );
}