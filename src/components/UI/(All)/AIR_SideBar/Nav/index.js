import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import WorkIcon from '@mui/icons-material/Work';

export default function Nav({ expanded, text, action }) {
  let icon = ''
  if (action[1] == '/calendar') {
    icon = (<EventNoteRoundedIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  } else if (action[1] == '/project') {
    icon = (<WorkIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  } else if (action[1] == '/student') {
    icon = (<SchoolRoundedIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  } else if (action[1] == '/') {
    icon = (<AssignmentIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  } else if (action[1] == '/personnel') {
    icon = (<AssignmentIndRoundedIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  }
  else {
    icon = (<AssignmentIcon sx={{
      height: '25px',
      color: 'inherit',
      transition: 'all .3s linear'
    }} />)
  }
  return (
    <>
      <ListItem
        sx={(theme) => ({
          width: '90%',
          margin: '4px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: action[0].slice(0, action[1].length) === action[1] && action[1] != '/' ? 'var(--main)' :
              action[0] == action[1] ? 'var(--main)' : 'var(--background)',
          },
          backgroundColor: action[0].slice(0, action[1].length) === action[1] && action[1] != '/' ? 'var(--main)' : action[0] == action[1] ? 'var(--main)' : 'transparent',
          color: action[0].slice(0, action[1].length) === action[1] && action[1] != '/' ? 'white' : action[0] == action[1] ? 'white' : '#3b4056',
        })}
      >
        <ListItemIcon sx={{ width: '35px', minWidth: '35px', display: 'flex', justifyContent: 'center', color: 'inherit' }}>
          {icon}
        </ListItemIcon>
        {expanded && (
          <Box
            sx={{
              ml: '5px',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
              opacity: 0,
              fontSize: 0,
              transform: 'translateX(-10px)',
              animation: 'fadeIn 0.2s ease-out 0.2s forwards',
              '@keyframes fadeIn': {
                to: {
                  fontSize: '16px',
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              },
            }}
          >{text}</Box>
        )}
      </ListItem>
    </>
  )
}