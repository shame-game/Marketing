import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function AIR_TableList({ title, icon, content }) {
  return (
    <>
      <Box sx={{ overflow: 'hidden', borderRadius: '8px', border: '1px solid #dadce0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', background: '#f8f9fa', px: 2, py: 1.5, borderBottom: '1px solid #dadce0' }}>
          <Typography className="Title_Popup">{title}</Typography>
          <Box>{icon}</Box>
        </Box >
        <Box sx={{ backgroundColor: 'white' }}>{content}</Box>
      </Box >
    </>
  )
}