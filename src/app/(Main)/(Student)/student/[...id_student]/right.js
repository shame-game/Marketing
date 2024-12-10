'use client'

import React, { useState, useRef } from 'react';
import { Box, Typography, Tabs, Tab, Button, Paper, Snackbar, Alert } from '@mui/material';
import '@/style/index.css'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import PickPhotoIT from './Profile/PhotoIntro'
import PickPhotoPJ from './Profile/PhotoProject'
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import fetchApi from '@/utils/API_suport/fetchData';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PickPhotoCourse from './Profile/PhotoCourse';
import PickPhotoSkill from './Profile/PhotoSkill';

export default function Right({ children, image }) {
  console.log(image);

  const [profile, setprofile] = useState(children.Profile ? children.Profile : false)
  const [course, setcourse] = useState(children.Course ? children.Course : false)
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const textareaRef = useRef(null);

  const handleDeleteClick = (imageSrc) => {
    setImageToDelete(imageSrc);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setprofile((prevState) => ({
      ...prevState,
      ImgPJ: prevState.ImgPJ.filter((img) => img !== imageToDelete),
    }));
    setSnackbarMessage('Đã xóa hình ảnh');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };
  // Biến thông báo
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleImageCourse = (src, course) => {
    setcourse((prevCourse) => ({
      ...prevCourse,
      [course]: {
        ...prevCourse[course],
        Image: src,
      },
    }));
  }
  const handleImageSkill = (src) => {
    setprofile(prevState => ({
      ...prevState,
      'ImgSkill': [src]
    }));
  }

  const handleIntroductionChange = (e) => {
    const newValue = e.target.value;
    setprofile(prevState => ({
      ...prevState,
      'Intro': newValue
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleImageSelect = (src) => {
    setprofile(prevState => ({
      ...prevState,
      'Avatar': [src]
    }));
  };
  const handleImageProject = (src) => {
    setprofile((prevState) => ({
      ...prevState,
      ImgPJ: [...new Set([...prevState.ImgPJ, ...src])] // Merge arrays and ensure uniqueness
    }));
  };
  const handleKQHT = (e) => {
    const newValue = e.target.value;
    setcourse(prevState => ({
      ...prevState,
      'Comment': [newValue]
    }));
  };
  const uPF = async () => {
    setIsLoading(true);
    try {
      let data = await fetchApi('/Student_PF/uPF', { method: 'POST', body: JSON.stringify({ id: children._id, newProfile: profile, newCourse: course }) });
      setprofile(data);
      setSnackbarMessage('Cập nhật hồ sơ thành công!');

      setSnackbarSeverity('success');
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật hồ sơ!');
      setSnackbarSeverity('error');
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  }

  const createProfile = async () => {
    setIsLoading(true);
    try {
      let data = await fetchApi('/Student_Create/c_profile', { method: 'POST', body: JSON.stringify({ ID: children.ID, Name: children.Name }) });
      setprofile(data.Profile);
      setSnackbarMessage('Tạo hồ sơ điện tử thành công!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Có lỗi xảy ra khi tạo hồ sơ điện tử!');
      setSnackbarSeverity('error');
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <Box sx={{ height: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ background: 'white', borderRadius: '6px 6px 0 0', border: 'thin solid', borderColor: '#d3d5d7' }}>
          <Tab label="Hồ sơ điện tử" />
          <Tab label="Khóa học" />
          <Tab label="Hình ảnh" />
          <Tab label="Video" />
        </Tabs>
        {tabValue === 0 && (
          <div style={{ height: 'calc(100% - 28px)', px: 2, overflow: 'hidden', overflowY: 'scroll' }} className='Wrap_Scroll_n'>
            {profile ? <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '12px 3px' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', p: '12px 3px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Hồ sơ điện tử</Typography>
                  <Link className='flexCenter' target='_blank' href={`https://eportfolio.airobotic.edu.vn/Student?ID=${children.ID}`}>
                    <AssignmentIndIcon sx={{ fontSize: 24, cursor: 'pointer', color: 'var(--icon_1)' }} />
                  </Link>
                </div>
                <Button variant='contained' onClick={uPF}>Cập nhập</Button>
              </Box>
              <div style={{
                padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)'
              }}>
                <p className='text_3' style={{ paddingBottom: 12, borderBottom: 'thin solid var(--background_1)' }}>Giới thiệu</p>
                <Grid container spacing={2}>
                  <Grid xs={12} md={8} lg={8}>
                    <p className='text_3' style={{ padding: '12px 0 8px 0' }} >Thông tin chung</p>
                    <p className='text_4_m' style={{ paddingBottom: 6 }}> Họ và tên: {children.Name} </p>
                    <p className='text_4_m'> Khóa học tham gia: {Object.Course ? Object.keys(children.Course).length : 0} Khóa học </p>
                    <p className='text_3' style={{ paddingTop: 12 }} >Giới thiệu bản thân</p>
                    <textarea
                      ref={textareaRef}
                      className='text_4_m'
                      style={{
                        border: 'none', padding: '8px 0', outline: 'none', textAlign: 'justify', width: '100%', maxWidth: '100%', minWidth: '100%',
                        overflow: 'hidden', resize: 'none', lineHeight: 1.5, height: '150px'
                      }}
                      defaultValue={profile.Intro}
                      onChange={handleIntroductionChange}
                    >

                    </textarea>
                  </Grid>
                  <Grid xs={12} md={4} lg={4}>
                    <PickPhotoIT Images={image} onImageSelect={handleImageSelect} status={profile.Avatar ? profile.Avatar : null} />
                  </Grid>
                </Grid>
              </div>
              <div style={{
                padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)', marginTop: 16
              }}>
                <p className='text_3' style={{ paddingBottom: 12, borderBottom: 'thin solid var(--background_1)' }}>Sản phẩm học tập</p>
                <Grid container spacing={1} sx={{ p: '16px 0' }}>
                  {profile.ImgPJ ? (
                    <>
                      {profile.ImgPJ.map((t) => (
                        <Grid key={t} xs={4} md={2} lg={2} sx={{ p: 1 }}>
                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              paddingTop: '100%',
                            }}
                          >
                            <Image
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={t}
                              alt="Hình ảnh"
                              fill
                              style={{
                                objectFit: 'cover',
                                borderRadius: '8px',
                                cursor: 'pointer',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                transition: 'background-color 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                                const iconButton = e.currentTarget.querySelector('button');
                                if (iconButton) iconButton.style.opacity = 1;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                                const iconButton = e.currentTarget.querySelector('button');
                                if (iconButton) iconButton.style.opacity = 0;
                              }}
                            >
                              <IconButton
                                onClick={() => handleDeleteClick(t)}
                                sx={{
                                  color: 'white',
                                  opacity: 0,
                                  transition: 'opacity 0.3s',
                                  '&:hover': {
                                    background: 'red',
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </>
                  ) : null}
                  <Grid xs={4} md={2} lg={2} sx={{ p: 1 }}>
                    <PickPhotoPJ Images={image} onImageProject={handleImageProject} />
                  </Grid>
                </Grid>
              </div>
              <div style={{
                padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)', margin: '16px 0'
              }}>
                <p className='text_3' style={{ paddingBottom: 12, borderBottom: 'thin solid var(--background_1)' }}>Kết quả học tập</p>
                {children.Course ?
                  <>{
                    <>{Object.entries(course).map((t, index) => {
                      if (!t || !t[1].StatusLearn) return ""
                      else {
                        return (
                          <Accordion defaultExpanded={index === 0} key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <p className="text_3">
                                Kết quả học tập khóa: <span className="text_3_m">{t[0]}</span>
                              </p>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid xs={12} md={4} lg={4}>
                                  <PickPhotoCourse Images={image} onImageCourse={handleImageCourse} status={t[1].Image ? t[1].Image : null} course={t[0]} />
                                </Grid>
                                <Grid xs={12} md={8} lg={8}>
                                  <p className='text_3'>Nhận xét tổng</p>
                                  <textarea
                                    className='text_4_m'
                                    style={{
                                      flex: 1,
                                      border: 'none', padding: '8px 0', outline: 'none', textAlign: 'justify', width: '100%', maxWidth: '100%', minWidth: '100%', lineHeight: 1.5, height: '300px'
                                    }}
                                    onChange={handleKQHT}
                                    defaultValue={t[1].Comment}
                                  >
                                  </textarea>
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        )
                      }
                    })}</>
                  }</>
                  : null}
                <p className='text_3' style={{ padding: '12px 0', borderBottom: 'thin solid var(--background_1)' }}>Đánh giá tổng quan</p>
                <Grid container spacing={2}>
                  <Grid xs={12} md={6} lg={6} sx={{ pt: 2 }}>
                    {profile.Skill ? <>{Object.entries(profile.Skill).map((t, index) => (
                      <SkillBar key={index} color={colorSkill[index]} value={t[1]} title={t[0]} />
                    ))}</> : null}
                  </Grid>
                  <Grid xs={12} md={6} lg={6}>
                    <div style={{ width: '55%', margin: '16px 12px 0 auto' }}>
                      <PickPhotoSkill Images={image} onImageSkill={handleImageSkill} status={profile.ImgSkill ? profile.ImgSkill : null} />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div style={{
                padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)', margin: '16px 0'
              }}>
                <p className='text_3' style={{ paddingBottom: 12, borderBottom: 'thin solid var(--background_1)' }}>Video thuyết trình</p>
              </div>
            </> : <div className='flexCenter' style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
              <p className='text_2' style={{ marginBottom: 12 }}> Học sinh chưa có hồ sơ điện tử</p>
              <Button variant="contained" size='small' onClick={createProfile}>Tạo ngay</Button>
            </div>}
          </div>
        )}
        {tabValue === 1 && (
          <div style={{ height: 'calc(100% - 28px)', px: 2, overflow: 'hidden', overflowY: 'scroll' }} className='Wrap_Scroll_n'>
            <Box sx={{ display: 'flex', alignItems: 'center', p: '14.5px 3px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Khóa học </Typography>
            </Box>
            <div style={{
              padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)'
            }}>

            </div>
          </div>
        )}
        {tabValue === 2 && (
          <div style={{ height: 'calc(100% - 28px)', px: 2, overflow: 'hidden', overflowY: 'scroll' }} className='Wrap_Scroll_n'>
            <Box sx={{ display: 'flex', alignItems: 'center', p: '14.5px 3px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Hình ảnh học sinh</Typography>
            </Box>
            <div style={{
              padding: 12, border: 'thin solid', borderColor: '#d3d5d7', borderRadius: 6, background: 'white', boxShadow: 'var(--box)'
            }}>
              <p className='text_3' style={{ paddingBottom: 12, borderBottom: 'thin solid var(--background_1)' }}>Hình ảnh lấy từ các khóa học mà học sinh đã tham gia</p>
              {image ? Object.keys(image).length > 0 ? (
                Object.entries(image).map(([courseId, courseImages]) => {
                  if (!Array.isArray(courseImages)) return null;
                  return (
                    <Accordion
                      defaultExpanded
                      key={courseId}
                      sx={{
                        boxShadow: 'var(--box)',
                        border: 'thin solid',
                        borderColor: '#d3d5d7',
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <p className="text_3">
                          Hình ảnh khóa học: <span className="text_3_m">{courseId}</span>
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid
                          container
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '10px',
                          }}
                        >
                          {courseImages.map((src, imgIndex) => (
                            <Box
                              key={`${courseId}-${imgIndex}`}
                              sx={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '100%',
                              }}
                            >
                              <Image
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                src={src}
                                alt={`Hình ảnh ${imgIndex + 1} của khóa học ${courseId}`}
                                fill
                                style={{
                                  objectFit: 'cover',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                }}
                              />
                            </Box>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <p>Đang tải hình ảnh...</p>
              ) : <p>Không có hình ảnh</p>}
            </div>
          </div>
        )}
        {tabValue === 3 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Video</Typography>
            <Typography>Nội dung video sẽ được hiển thị ở đây</Typography>
          </Box>
        )}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xóa hình ảnh</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa hình ảnh này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button
            onClick={() => {
              handleConfirmDelete();
              setOpenDeleteDialog(false);
            }}
            color="primary"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export function SkillBar({ value, title, color }) {
  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ paddingBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
        <p className='text_4'>{title}</p>
        <p className='text_4_m' style={{ color: `${color}` }}>{value}%</p>
      </div>
      <div style={{ width: '100%', height: 7, borderRadius: 8, overflow: 'hidden', background: 'var(--background_1)' }}>
        <div style={{ width: `${value}%`, height: '100%', background: `${color}`, borderRadius: 6 }} ></div>
      </div>
    </div>
  )
}
const colorSkill = ['#f75023', '#1cbe59', '#8067f0', '#23ebf7', '#e4e223', '#2f5cd1']