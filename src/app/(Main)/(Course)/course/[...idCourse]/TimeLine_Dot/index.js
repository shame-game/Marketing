import Box from '@mui/material/Box';
import Link from 'next/link';

export default function TimeLine_Dot({ course, type, index, data, props }) {
  let id = data.ID
  if (data.Student) id += '-' + formatDate(data.Day)
  return (
    <Link href={`/course/${course}/${id}`}>
      <Box sx={{ display: 'flex', padding: '20px 0', position: 'relative', cursor: 'pointer', textDecoration: 'none' }}>
        {type == 'end' ? null : type == 'main' ?
          <Box sx={{ position: 'absolute', left: 18.5, top: '50%', height: '100%', width: '3px', backgroundColor: '#1f5fa2', zIndex: '0' }}></Box> :
          <Box sx={{ position: 'absolute', left: 18.5, top: '0', height: '200%', width: '3px', backgroundColor: '#1f5fa2', zIndex: '0' }}></Box>}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box className="flexCenter" sx={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1f5fa2', color: 'white', zIndex: 1 }}>{index + 1}</Box>
          <Box sx={{ flex: 1 }}>
            <Box className="Title_Popup" sx={{ display: 'flex', fontSize: '13px', color: props == id ? 'var(--main)' : '#37383e' }}>{data.Topic}
              {data.Student ? <p className="Chip text_4_m" style={{ background: '#bd3636', color: 'white', marginLeft: 8 }}>Buổi bù</p> : null}
            </Box>
            <Box sx={{ fontSize: '13px', color: props == id ? 'var(--main)' : '#37383e' }}>Ngày {data.Day}</Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )

}

function formatDate(dateStr) {
  let [day, month, year] = dateStr.split('/');
  return `${year}${month}${day}`;
}