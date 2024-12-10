'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

export default function AIR_Dialog({ onSave, icon, title, name }) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues(value);
  };

  const handleSave = () => {
    onSave(values);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen}>{icon}</Box>
      <Dialog
        fullWidth='sm'
        maxWidth='sm'
        open={open}
        onClose={handleClose}>
        <Box sx={{ px: 3, py: 2 }}>
          <Box className="Title_Popup" sx={{ mb: 2 }}>{title}</Box>
          <Box>
            <TextField
              autoFocus
              required
              id="name"
              name="cmt"
              label={name}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', pt: 2 }}>
            <Button onClick={handleClose}>Thoát</Button>
            <Button onClick={handleSave}>Xác nhận</Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}