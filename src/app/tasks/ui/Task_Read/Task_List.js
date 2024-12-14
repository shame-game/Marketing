'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Divider from '@mui/material/Divider';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import LibraryAddCheckRoundedIcon from '@mui/icons-material/LibraryAddCheckRounded';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import Link from 'next/link';
export default function Task_Read_List({ student }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indexOfLastStudent = (page + 1) * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = student.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <Box sx={{ width: '100%' }}>
      {currentStudents.map((student, index) => (
        <UI_Student_List key={index} data={student} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, borderTop: 'thin solid var(--background_1)' }}>
        <TablePagination
          component="div"
          count={student.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

function UI_Student_List({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [detail, setdetail] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDetail = () => setdetail(true)
  const detailClose = () => setdetail(false)

  return (
    <>
      <Box
        sx={{
          height: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          py: '10px',
          px: 2,
          borderBottom: '1px solid',
          borderColor: 'var(--background_1)',
          textDecoration: 'none',
          backgroundColor: data.Check ? '#d2ffd2' : 'unset',
          transition: 'all .2s linear',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: data.Check ? '#b2efb2' : 'var(--background)',
          },
        }}
        onClick={openDetail}
      >
        <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <p>{data.Project}</p>
        </Box>
        <Box sx={{ flex: '2', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
          <p>{data.Task}</p>
        </Box>
        <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
          <p>{data.Start}</p>
        </Box>
        <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
          <p>{data.End}</p>
        </Box>
        <Box sx={{ flex: '.7', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
          <p>{data.Type}</p>
        </Box>
        <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
          <p>{data.DoerCheck}</p>
        </Box>
        <Box sx={{ flex: '.7', display: 'flex', alignItems: 'center', color: 'var(--text)', justifyContent: 'center' }}>
          <Tooltip title="Hoàn thành">
            <div className={data.Check ? 'iconWrap2 flexCenter' : 'iconWrap flexCenter'} >
              <AssignmentTurnedInRoundedIcon fontSize="small" sx={{ color: data.DoerDone ? 'green' : 'unset' }} />
            </div>
          </Tooltip>
          <Tooltip title="Được duyệt">
            <div className={data.Check ? 'iconWrap2 flexCenter' : 'iconWrap flexCenter'} >
              <LibraryAddCheckRoundedIcon fontSize="small" sx={{ color: data.Check ? 'green' : 'unset' }} />
            </div>
          </Tooltip>
        </Box>
        <Box sx={{ flex: '.3', display: 'flex', alignItems: 'center', color: 'var(--text)', justifyContent: 'center', fontWeight: '500', gap: 1 }}>
          <Tooltip title="Hành động">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={openDetail}>
              <ListItemIcon>
                <InfoRoundedIcon fontSize="small" />
              </ListItemIcon>
              Xem chi tiết
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BorderColorRoundedIcon fontSize="small" />
              </ListItemIcon>
              Sửa công việc
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AssignmentTurnedInRoundedIcon fontSize="small" />
              </ListItemIcon>
              Xác nhận hoàn thành
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LibraryAddCheckRoundedIcon fontSize="small" />
              </ListItemIcon>
              Kiểm tra công việc
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ color: '#b01b1b' }}>
              <ListItemIcon>
                <DeleteRoundedIcon sx={{ color: '#b01b1b' }} fontSize="small" />
              </ListItemIcon>
              Xóa công việc
            </MenuItem>
          </Menu>
        </Box>
      </Box >
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={detail}
        onClose={detailClose}
      >
        <Box className="Title_Popup" sx={{ p: 2, borderBottom: 'thin solid var(--background_1)' }}>Chi tiết công việc</Box>
        <Box sx={{ p: 2, bgcolor: 'var(--background)', pt: 1, maxHeight: '80vh' }} >
          <div style={{ flex: 1 }}>
            <p className="Title_Popup" style={{ padding: '4px 0 12px 0' }}>Thông tin</p>
            <div style={{
              display: 'flex', gap: 8, flexDirection: 'column', padding: 12,
              border: 'thin solid var(--background_1)', borderRadius: 3, background: 'white'
            }}>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Công việc:</p> {data.Task}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Thời gian thực hiện: </p>{data.Start == data.End ? data.Start : `${data.Start} - ${data.End}`}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Chi tiết công việc:</p> {data.Detail}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Ghi chú: </p>{data.Note}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Loại công việc:</p> {data.Type}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Trạng thái: </p>{data.Check}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Người kiểm duyệt:</p> {data.DoerDetail}</div>
            </div>
          </div>
          <p className="Title_Popup" style={{ margin: '12px 0 12px 0' }}>Tài nguyên</p>
          <div style={{
            display: 'flex', gap: 8, padding: 12,
            border: 'thin solid var(--background_1)', borderRadius: 3, background: 'white', width: 'calc(100% - 24px)'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: .5,
            }}>
              <img
                src='https://assets.minimals.cc/public/assets/icons/apps/ic-app-drive.svg'
                alt='dsds'
                loading="lazy"
              />
              <Box>{data.Project} - {data.Task}</Box>
            </Box>
          </div>
        </Box>
      </Dialog >
    </>
  );
}
