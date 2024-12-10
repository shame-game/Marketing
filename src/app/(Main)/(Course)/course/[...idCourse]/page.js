import Box from '@mui/material/Box';
import Left from './Left';
import Right from './Right';
import GetAllStudent from '@/app/api/allStudent'
import fetchApi from '@/utils/API_suport/fetchData';
import GetPerSever from '@/utils/GetPerSever'


export default async function _idCourse({ params }) {
  const { idCourse } = params;
  const per = await GetPerSever()
  let data;
  try {
    data = await fetchApi('/Course_Read/one', { method: 'POST', body: JSON.stringify({ source: 1, ID: idCourse[0] }) });
  } catch (error) {
    data = null
  }
  let student = await GetAllStudent()

  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 88px)',
      display: 'flex',
    }}>
      <div style={{ height: 'calc(100% - 16px)', minWidth: '430px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 8 }}>
        <Left data={data} props={idCourse[1]} />
      </div>
      <div style={{ height: 'calc(100% - 16px)', padding: 8, flex: 1 }}>
        <Right props={idCourse[1]} data={data} student={student} />
      </div>
    </Box>
  );
};