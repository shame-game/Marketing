import vam from './index.module.css'

export default function AIR_BoxCourse({ data }) {
  return (
    <div className={vam.wrap}>
      <div className={vam.title}>
        <div style={{ flex: 1 }}>
          <div className={vam.title_text1}>
            <p className='text_3' style={{ marginBottom: 3 }}>{data.name}</p>
            <p className='Chip' style={{ background: 'var(--bienhoa_b)', color: 'var(--bienhoa_m)', fontSize: '14px' }}>{data.name}</p>
          </div>
          <p style={{ color: 'var(--text_400)', fontSize: '14px', fontWeight: 500 }}>{data.name}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        <span style={{ color: 'var(--text)' }}>Thời gian bắt đầu: {data.createdAt.split('T')[0].slice(-2)}/
          {data.createdAt.split('T')[0].slice(-5, -3)}/{data.createdAt.split('T')[0].slice(0, 4)}</span>
      </div>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        <span style={{ color: 'var(--text)' }}>Số lượng thành viên: {data.members.length}</span>
        <span style={{ color: 'var(--text_400)' }}> Thành viên</span>
      </div>
      {/* <LinearProgress
      variant="determinate"
      value={0.6}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E6E8F0',
        '& .MuiLinearProgress-bar': {
          borderRadius: 4,
          backgroundColor: '#3366FF'
        }
      }}
    /> */}
    </div>
  )
}
