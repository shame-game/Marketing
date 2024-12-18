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
import { Project_Read_all, Task_Read_Type, User_Read_all } from '@/app/data';
import Task_Update from '../Task_Update/Task_Update';

export default function Task_Read_List({ student, type, dataType, dataProject, token, user }) {
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
        <UI_Student_List key={index} data={student} types={type} dataType={dataType} dataProject={dataProject} token={token} user={user} />
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

function UI_Student_List({ data, types, dataType, dataProject, token, user }) {
  let startDate = data.startDate.split('T')[0].slice(-2) + '/' +
    data.startDate.split('T')[0].slice(-5, -3) + '/' + data.startDate.split('T')[0].slice(0, 4)
  let endDate = data.endDate.split('T')[0].slice(-2) + '/' +
    data.endDate.split('T')[0].slice(-5, -3) + '/' + data.endDate.split('T')[0].slice(0, 4)
  let users = User_Read_all()
  let project = Project_Read_all()
  let type = types
  type.forEach(t => {
    if (t._id.toLowerCase() == data.taskCategory.toLowerCase()) type = t.name
  })
  project.forEach(t => { if (t._id == data.project) project = t.name })
  users.forEach(t => { if (t._id == data.checker) users = t.Name })

  if (typeof (type) == 'object') type = 'Không xác định'

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
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'var(--background_1)',
          textDecoration: 'none',
          backgroundColor: data.checkerDone ? '#d2ffd2' : 'unset',
          transition: 'all .2s linear',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: data.checkerDone ? '#b2efb2' : 'var(--background)',
          },
        }}
      >
        <div style={{ padding: '8px 0 8px 16px ', display: 'flex', flex: 7.4 }} onClick={openDetail}>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
            <p>{project}</p>
          </Box>
          <Box sx={{ flex: '2', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
            <p>{data.name}</p>
          </Box>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
            <p>{startDate}</p>
          </Box>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
            <p>{endDate}</p>
          </Box>
          <Box sx={{ flex: '.9', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
            <p>{type}</p>
          </Box>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
            <p>{users}</p>
          </Box>
          <Box sx={{ flex: '.7', display: 'flex', alignItems: 'center', color: 'var(--text)', justifyContent: 'center' }}>
            <Tooltip title="Hoàn thành">
              <div className={data.Check ? 'iconWrap2 flexCenter' : 'iconWrap flexCenter'} >
                <AssignmentTurnedInRoundedIcon fontSize="small" sx={{ color: data.doerDone ? 'green' : 'unset' }} />
              </div>
            </Tooltip>
            <Tooltip title="Được duyệt">
              <div className={data.checkerDone ? 'iconWrap2 flexCenter' : 'iconWrap flexCenter'} >
                <LibraryAddCheckRoundedIcon fontSize="small" sx={{ color: data.checkerDone ? 'green' : 'unset' }} />
              </div>
            </Tooltip>
          </Box>
        </div>
        <Box sx={{ flex: '.3', display: 'flex', alignItems: 'center', color: 'var(--text)', justifyContent: 'center', fontWeight: '500', gap: 1, pr: 2 }}>
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
            <Task_Update button={<MenuItem >
              <ListItemIcon>
                <BorderColorRoundedIcon fontSize="small" />
              </ListItemIcon>
              Sửa công việc
            </MenuItem>} dataType={dataType} dataProject={dataProject} token={token} user={user} />
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
        <Box className="Title_Popup" sx={{ p: 2, borderBottom: 'thin solid var(--background_1)' }}>Công việc thuộc dự án {project}</Box>
        <Box sx={{ p: 2, bgcolor: 'var(--background)', pt: 1, maxHeight: '80vh' }} >
          <div style={{ flex: 1 }}>
            <p className="Title_Popup" style={{ padding: '4px 0 12px 0' }}>Thông tin</p>
            <div style={{
              display: 'flex', gap: 8, flexDirection: 'column', padding: 12,
              border: 'thin solid var(--background_1)', borderRadius: 3, background: 'white'
            }}>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Công việc:</p> {data.name}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>
                Thời gian thực hiện: </p>{startDate == endDate ? startDate : `${startDate} - ${startDate}`}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Chi tiết công việc:</p> {data.detail}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Loại công việc:</p> {type}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Trạng thái hoàn thành: </p>{data.doerDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Trạng thái kiểm duyệt: </p>{data.checkerDone ? 'Đã duyệt' : 'Chưa duyệt'}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Người kiểm duyệt:</p> {user}</div>
              <div style={{ display: 'flex', gap: 8 }}><p className='text_3' style={{ fontWeight: 500 }}>Ghi chú: </p>{data.notes}</div>
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
