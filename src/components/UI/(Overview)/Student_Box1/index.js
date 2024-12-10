import Box from "@mui/material/Box"
import Svg from '@/components/svg'

export default function Student_Box({ id, color, background, title, quantity }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <Box sx={{ width: '55px', height: '55px', backgroundColor: background, display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
        <Svg id={id} width="30px" fill={color} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '500' }}>
        <Box className="content" sx={{ color: 'vamColor.text_Content' }}>{title}</Box>
        <Box className="title_1" sx={{ color: color }}>{quantity} học sinh</Box>
      </Box>
    </Box>
  )
}
