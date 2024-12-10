'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, Autocomplete } from '@mui/material';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';

export default function FormDialog({ onSave, book, course, topic }) {
  let topics = []
  for (let i in book) {
    if (book[i].Name == course) {
      topics = book[i].Topic
      break;
    }
  }

  const [values, setValues] = React.useState({
    time: '',
    lesson: 4,
    room: '',
    topic: '',
    id: ''
  })
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSave = () => {
    onSave(values);
    setOpen(false)
  };
  const Topic = {
    options: Object.keys(topics).map(item => ({ title: topics[item].Name, content: item })),
    getOptionLabel: (option) => option.title,
    isOptionEqualToValue: (option, value) => option.title === value.title,
  };

  return (
    <React.Fragment>
      <Button size='small' onClick={handleClickOpen}>
        <AddToPhotosRoundedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={'sm'}
        maxWidth={'sm'}
      >
        <DialogTitle>Buổi {topic}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ mt: '5px' }}>Thời gian học: </Typography>
            <TextField autoFocus required id="time" name="time" type="datetime-local" onChange={handleInputChange} variant="standard" sx={{ flex: 1 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ mt: '5px' }}>Số tiết: </Typography>
            <TextField autoFocus required id="lesson" name="lesson" type="number" value={4} onChange={handleInputChange} variant="standard" sx={{ flex: 1 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ mt: '5px' }}>Phòng học: </Typography>
            <TextField autoFocus required id="room" name="room" type="text" variant="standard" onChange={handleInputChange} sx={{ flex: 1 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ mt: '5px' }}>Chủ đề: </Typography>
            <Autocomplete
              {...Topic}
              sx={{ flex: 1 }}
              id="disable-clearable"
              disableClearable
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
              onChange={(event, value) => setValues(prevState => ({
                ...prevState,
                topic: value ? value.title : '',
                id: value ? value.content : ''
              }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay lại</Button>
          <Button variant='contained' onClick={handleSave}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


