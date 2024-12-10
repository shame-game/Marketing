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
import { useStudentContext } from '@/context/student'

export default function UpdateStudent({ data, bt }) {
  const { dataStudent, updateStudent } = useStudentContext();
  const [state, setState] = React.useState({ right: false });

  const updateStudentData = (updatedData) => {
    const updatedStudents = dataStudent.map(student => student._id === updatedData._id ? updatedData : student);
    updateStudent(updatedStudents);
  };

  const [openPopup, setOpenPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const [formData, setFormData] = React.useState({
    ID: data.ID,
    Name: data.Name,
    BD: data.BD,
    School: data.School,
    Area: data.Area,
    Type: data.Type,
    Address: data.Address,
    ParentName: data.ParentName,
    Phone: data.Phone,
    Email: data.Email,
    Avt: data.Avt,
    Course: data.Course,
    Profile: data.Profile,
    Status: data.Status
  });

  const [imageError, setImageError] = React.useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSwitchChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      emailVerified: event.target.checked
    }));
  };

  const toggleDrawer = (anchor, open) => (event) => {
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
        <div onClick={toggleDrawer('right', true)}>{bt}</div>
        <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
          <Box sx={{ width: 1200 }} role="presentation">
            <Box className="flexCenter" height={64} sx={{ borderBottom: '1px solid', borderColor: 'vamColor.background_1', backgroundColor: 'white', justifyContent: 'start' }}>
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
                      <Grid item xs={12}>
                        <TextField size="small"
                          fullWidth
                          select
                          label="Loại học sinh"
                          variant="outlined"
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="Đang học">Đang học</MenuItem>
                          <MenuItem value="Chờ lên khóa">Chờ lên khóa</MenuItem>
                          <MenuItem value="Đã nghỉ">Đã nghỉ</MenuItem>
                        </TextField>
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
                disabled={!Object.keys(formData).some(key => formData[key] !== data[key])}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const response = await fetch(`/api/updateStudent?id=${data._id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                    });
                    if (response.ok) {
                      setIsLoading(false);
                      setOpenSnackbar(true);
                      let g = await response.json()
                      updateStudentData(g)
                      setState({ 'right': false })
                    } else {
                      setIsLoading(false);
                      setOpenSnackbar(true);
                      setSnackbarMessage('Sửa thông tin học sinh thất bại');
                      setSnackbarSeverity('error');
                    }
                  } catch (error) {
                    setIsLoading(false);
                    setOpenSnackbar(true);
                    setSnackbarMessage(`Đã xảy ra lỗi ${error}`);
                    setSnackbarSeverity('error');
                  }
                }}
              >
                Cập nhập
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

