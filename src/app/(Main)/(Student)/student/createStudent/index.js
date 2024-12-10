'use client';

import { Box, Button, Grid, TextField, MenuItem } from '@mui/material';
import * as React from 'react';
import { Drawer, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Link from 'next/link';
import '@/style/index.css'
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import vam from './index.module.css'

export default function ButtonCreate({ LoadID }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const [openPopup, setOpenPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const [formData, setFormData] = React.useState({
    ID: LoadID,
    Name: '',
    BD: '',
    School: '',
    Area: '',
    Type: 'Chính thức',
    Address: '',
    ParentName: '',
    Phone: '',
    Email: '',
    Avt: '',
    Course: {},
    Profile: '',
    Status: 'Đang học'
  });

  const [imageError, setImageError] = React.useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedData = { ...formData };
    delete cleanedData.fdprocessedid;
  };
  let c = false
  return (
    <Box>
      <React.Fragment key="right">
        <div onClick={toggleDrawer('right', true)} className={vam.button}>{add}</div>
        <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          <Box sx={{ width: 1200 }} role="presentation">
            <Box className="flexCenter" height={64} sx={{ borderBottom: '1px solid', borderColor: 'var(--main)', backgroundColor: 'white', justifyContent: 'start' }}>
              <Box className="title" sx={{ mx: 3, fontWeight: '600', color: 'vamColor.text_Title' }}>Thêm học sinh mới</Box>
            </Box>
            <Box sx={{ p: 3, width: 'calc(100% - 48px)', backgroundColor: 'vamColor.background', height: 'calc(100vh - 48px - 64px)' }} >
              <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={3} className='flexCenter' sx={{
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                  gap: 2,
                  backgroundColor: 'white'
                }}>
                  <Box
                    className="flexCenter"
                    onClick={() => setOpenPopup(true)}
                    sx={{
                      width: 135,
                      height: 135,
                      border: '1px solid',
                      borderColor: '#f0f0f0',
                      borderRadius: '50%',
                      m: 1,
                      mt: 5,
                      transition: 'all .3s linear',
                      '&:hover': {
                        backgroundColor: 'vamColor.background',
                        cursor: 'pointer'
                      },
                    }}
                  >
                    {formData.Avt && formData.Avt.trim() !== '' ? (
                      <Box
                        component="img"
                        src={formData.Avt}
                        alt="Student Image"
                        sx={{
                          width: 125,
                          height: 125,
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://lh3.googleusercontent.com/d/1Y-Dl9lHv4b4XjMZ5gW2DoRsC01UnAMn_";
                        }}
                      />
                    ) : (
                      <Box Box
                        className="flexCenter"
                        sx={{
                          width: 125,
                          height: 125,
                          borderRadius: '50%',
                          bgcolor: '#f0f0f0',
                          flexDirection: 'column',
                          gap: 1
                        }}
                      >
                        <AddAPhotoIcon />
                        <Box className="content" sx={{ fontWeight: '600', fontSize: '12px', color: 'vamColor.text_Content' }}>Thêm hình ảnh</Box>
                      </Box>
                    )}
                  </Box>
                  <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                    <DialogTitle>Thêm hình ảnh</DialogTitle>
                    <DialogContent>
                      <DialogContentText sx={{ mb: 2 }}>
                        Dán đường liên kết hình ảnh của học sinh vào đây!
                      </DialogContentText>
                      <TextField
                        size="small"
                        fullWidth
                        label="Link image"
                        variant="outlined"
                        name="Avt"
                        value={formData.Avt}
                        onChange={handleInputChange}
                        error={!!imageError}
                        helperText={imageError}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenPopup(false)}>Hủy</Button>
                      <Button onClick={() => {
                        const Avt = formData.Avt;
                        fetch(Avt)
                          .then(response => {
                            if (response.ok) {
                              setOpenPopup(false);
                              c = true
                            } else {
                              c = false
                              setImageError("Đường dẫn hình ảnh không hợp lệ. Vui lòng kiểm tra lại.");
                            }
                          })
                          .catch(() => {
                            c = false
                            setImageError("Không thể truy cập đường dẫn. Vui lòng kiểm tra lại.");
                          });
                      }}>Xác nhận</Button>
                    </DialogActions>
                  </Dialog>
                  <Box sx={{ mx: 2, textAlign: 'center', fontSize: '14px', fontWeight: '500', color: 'vamColor.text_Content' }} className="content">
                    Sử dụng link drive để lưu hình đại diện của học sinh
                  </Box>
                  <Link href="https://drive.google.com/drive/folders/1DWuYioh2tS-ldWadecJRsAWEE4zGbeaE"
                    style={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', color: 'vamColor.main', mb: 5, textDecoration: 'none' }}
                    className="content">
                    Drive lưu hình
                  </Link>
                </Grid>
                <Grid item xs={9} className='flexCenter' sx={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  py: 2,
                  pl: 2,
                }}>
                  <Box className="flexCenter" sx={{ gap: .5, flexDirection: 'column', alignItems: 'start' }}>
                    <Box className="title">Thông tin học sinh</Box>
                    <Box className="content" sx={{ mb: 2, mt: .5, color: '#e46962' }}>*Những thông tin này là thông tin bắt buộc khi thêm học sinh</Box>
                  </Box>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField size="small" fullWidth label="Họ và Tên" variant="outlined" name="Name" value={formData.Name} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField size="small" fullWidth label="Ngày sinh" variant="outlined" name="BD" value={formData.BD} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField size="small" fullWidth label="Trường học" variant="outlined" name="School" value={formData.School} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField size="small"
                          fullWidth
                          select
                          label="Loại học sinh"
                          variant="outlined"
                          name="Type"
                          value={formData.Type}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Chính thức">Chính thức</MenuItem>
                          <MenuItem value="Tạm thời">Tạm thời</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField size="small" fullWidth label="Khu vực" variant="outlined" name="Area" value={formData.Area} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField size="small" fullWidth label="Địa chỉ" variant="outlined" name="Address" value={formData.Address} onChange={handleInputChange} />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>

              </Grid>
              <Box className="title" sx={{ my: 2 }}>Thông tin phụ huynh</Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField size="small" fullWidth label="Họ và Tên Phụ huynh" variant="outlined" name="ParentName" value={formData.ParentName} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField size="small" fullWidth label="Số điện thoại" variant="outlined" name="Phone" value={formData.Phone} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField size="small" fullWidth label="Email" variant="outlined" name="Email" value={formData.Email} onChange={handleInputChange} />
                  </Grid>
                </Grid>
              </form>
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const response = await fetch('/api/Student_Create/c_student', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                    });
                    if (response.ok) {
                      setIsLoading(false);
                      setOpenSnackbar(true);
                      setSnackbarMessage('Thêm học sinh thành công');
                      setSnackbarSeverity('success');
                      setFormData({
                        ID: LoadID,
                        Name: '',
                        BD: '',
                        School: '',
                        Area: '',
                        Type: '',
                        Address: '',
                        ParentName: '',
                        Phone: '',
                        Email: '',
                        Avt: '',
                        Course: {},
                        Profile: '',
                        Status: true
                      });
                      toggleDrawer('right', false);
                    } else {
                      setIsLoading(false);
                      setOpenSnackbar(true);
                      setSnackbarMessage('Thêm học sinh thất bại');
                      setSnackbarSeverity('error');
                    }
                  } catch (error) {
                    setIsLoading(false);
                    setOpenSnackbar(true);
                    setSnackbarMessage('Đã xảy ra lỗi');
                    setSnackbarSeverity('error');
                  }
                }}
              >
                Thêm học sinh
              </Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Drawer >
      </React.Fragment >
    </Box >
  );
}

const add = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height={20} width={20} fill='white'>
    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
) 