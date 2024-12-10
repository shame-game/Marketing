import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

export default function AIR_Table() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid black' }}>
        {header.map(t => (
          <Box sx={{ flex: `${t.size}`, justifyContent: `${t.align}`, display: 'flex', p: 1 }}>{t.title}</Box>
        ))}
      </Box>
      <Box>
        {Object.entries(body).map(([id, learnData]) => (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #c9c9c9' }}>
            {sxs.map(t => (
              <Box sx={{ flex: `${t.size}`, justifyContent: `${t.align}`, display: 'flex', p: 1 }}>
                {typeof (t.title) == 'string' ? <Box>{learnData[t.title]}</Box> : typeof (t.title) == 'object' ? t.title : <></>}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box >
  );
}

const header = [
  { title: 'Họ và Tên', size: '2', align: 'start' },
  { title: '', size: '2', align: 'center' },
  { title: 'Có mặt', size: '1', align: 'center' },
  { title: 'Có phép', size: '1', align: 'center' },
  { title: 'Nhận xét', size: '1', align: 'center' }
]
const body = {
  "AI0021": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0068": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0067": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0062": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0063": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0099": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  },
  "AI0098": {
    "Name": "Nguyễn Văn A",
    "Checkin": 0,
    "Cmt": ""
  }
}

const sxs = [
  { title: 'Name', size: '2', align: 'start' },
  { title: '', size: '2', align: 'center' },
  { title: <Checkbox defaultChecked />, size: '1', align: 'center' },
  { title: <Checkbox defaultChecked />, size: '1', align: 'center' },
  { title: 'icon', size: '1', align: 'center' }
]