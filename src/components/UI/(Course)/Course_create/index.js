'use client'
import React from 'react';
import Button from '@mui/material/Button';
import LayersIcon from '@mui/icons-material/Layers';
import Box from '@mui/material/Box';
import AIR_TableList from '@/components/AIR_TableList'
import AIR_Popup from '@/components/AIR_Popup'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import AIR_Popup2 from '@/components/AIR_Popup2'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Bt_Add_Course({ data_book }) {
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [indexs, setindex] = useState(false);

  const handleClickOpen = (index) => {
    setindex(index)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [courseG, setCourseG] = useState('');
  const [courseI, setCourseI] = useState('');
  const [courseA, setCourseA] = useState({
    address: '',
    area: '',
  });
  const [savedValues, setSavedValues] = useState([]);

  const defaultStudent = {
    options: teacher,
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.name === value.name,
  }

  const defaultCourse = {
    options: course,
    getOptionLabel: (option) => option.title,
    isOptionEqualToValue: (option, value) => option.title === value.title,
  };
  const defaultAddress = {
    options: address,
    getOptionLabel: (option) => option.address,
    isOptionEqualToValue: (option, value) => option.address === value.address,
  };
  const handleSaveValue = (newValue) => {
    setSavedValues(prevState => [...prevState, newValue]);
  }
  useEffect(() => {
  }, [savedValues]);

  const handleRemoveValue = (index) => {
    setOpen(false);
    setSavedValues(prevState => prevState.filter((value, i) => i !== index));
  }

  return (
    <>
      <AIR_Popup
        bt={
          <Button
            sx={{
              borderRadius: '10px 0 0 10px',
              transition: 'all .2s linear',
              '&:hover': { pr: 3, '& .MuiButton-label': { opacity: 1 } }
            }}
            variant="contained"
            startIcon={<LayersIcon />}> Thêm khóa học
          </Button>
        }
        Title="Thêm khóa học"
        Main={
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AIR_TableList
              title="Thông tin về khóa học"
              content={
                <Box sx={{ px: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1 }}>
                    <Box sx={{ width: 'max-content' }}>Tên khóa học:</Box>
                    <Box sx={{ flex: '1' }}>
                      <Autocomplete
                        {...defaultCourse}
                        sx={{ width: '100%' }}
                        id="disable-clearable"
                        disableClearable
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                        onChange={(e, value) => { setCourseI(value.title) }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1 }}>
                    <Box sx={{ width: 'max-content' }}>Địa điểm học:</Box>
                    <Box sx={{ flex: '1' }}>
                      <Autocomplete
                        {...defaultAddress}
                        sx={{ width: '100%' }}
                        id="disable-clearable"
                        disableClearable
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                        onChange={(e, value) => { setCourseA({ address: value.address, area: value.area }) }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1 }}>
                    <Box sx={{ width: 'max-content' }}>Giáo viên chủ nhiệm:</Box>
                    <Box sx={{ flex: '1' }}>
                      <Autocomplete
                        {...defaultStudent}
                        sx={{ width: '100%' }}
                        id="disable-clearable"
                        disableClearable
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                        onChange={(e, value) => { setCourseG(value.name) }}
                      />
                    </Box>
                  </Box>
                </Box>
              }
            />
            <AIR_TableList
              title="Lịch học"
              icon={<AIR_Popup2 onSave={handleSaveValue} book={data_book} course={courseI} topic={savedValues.length + 1} />}
              content={
                <Box sx={{ px: 2 }}>
                  {savedValues.length == 0 ?
                    <Box sx={{ p: 2 }} className="flexCenter">Chưa có thêm lịch học</Box> :
                    savedValues.map((value, index) => (
                      <Box key={index} sx={{ display: 'flex', p: 2, position: 'relative' }} onClick={() => { handleClickOpen(index) }}>
                        <Box sx={{ flex: 1 }}>Thời gian: {value.time}</Box>
                        <Box sx={{ flex: 1 }}>Chủ đề: {value.topic}</Box>
                        <Box sx={{ flex: .6 }}>Số tiết: {value.lesson}</Box>
                        <Box sx={{ flex: .6 }}>Phòng học: {value.room}</Box>
                      </Box>
                    ))}
                </Box>
              }
            />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description" >
              <DialogTitle>{"Use Google's location service?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Let Google help apps determine location. This means sending anonymous
                  location data to Google, even when no apps are running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => handleRemoveValue(indexs)}>Agree</Button>
              </DialogActions>
            </Dialog>
            <Button
              sx={{ width: 'max-content' }}
              variant="contained"
              onClick={async () => {
                if (savedValues.length < 1) {
                  alert("Phải đủ số buổi của chương trình học.");
                  return;
                }
                var Topicx = ''
                var IDLoad = '24'
                var Price = 0
                var Progress = ''
                var Type = ''
                var Detail = []
                savedValues.forEach((t) => {
                  let result = addHoursToTime(t.time.slice(-5).split(':')[0], t.time.slice(-5).split(':')[1], 3)
                  Detail.push({
                    Day: time(t.time.slice(0, 10)),
                    Topic: t.topic,
                    Room: t.room,
                    Time: t.time.slice(-5) + '-' + `${result.hours}:${result.minutes < 10 ? '0' : ''}${result.minutes}`,
                    Lesson: t.lesson,
                    ID: t.id,
                    Teacher: courseG,
                    TeachingAs: ""
                  })
                  Topicx = Topicx + '|' + time(t.time.slice(0, 10))
                })
                data_book.forEach(e => {
                  if (e.Name == courseI) {
                    let l = 1
                    IDLoad = IDLoad + e.ID + l.toString().padStart(3, '0')
                    Type = e.Type
                  }
                });
                try {
                  setIsLoading(true)
                  const url = `https://script.google.com/macros/s/AKfycbzntIe1JjogbToY-teezPACCgffLJDyBhJbTSK_WMqutBkaqctocqSZoORASIQS-w4hjw/exec?ID=${IDLoad}&Topic=${Topicx.slice(1).toString()}`
                  const responses = await fetch(url, {
                    method: 'GET'
                  }).then(response => response.json())
                    .then(async (data) => {
                      for (let i in Detail) Detail[i].Image = data.urls.split('|')[i]
                      const response = await fetch('/api/addCourse', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          TeacherHR: courseG,
                          ID: IDLoad,
                          Name: courseI,
                          Address: courseA.address,
                          Area: courseA.area,
                          Price: Price,
                          Progress: Progress,
                          Status: false,
                          Type: Type,
                          Detail: Detail,
                          TimeEnd: time(savedValues[0].time.slice(0, 10)),
                          TimeStart: time(savedValues[savedValues.length - 1].time.slice(0, 10)),
                          Student: []
                        }),
                      });
                    })
                  setIsLoading(false)
                } catch (error) {
                  console.log(error);
                }
              }}
            >Tạo khóa học
            </Button>
          </Box >
        } w={1} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
const address = [
  { address: 'Trung tâm bồi dưỡng văn hóa Khai Trí', area: 'Long Thành' },
  { address: 'Lab B304 - Trường Đại học Lạc Hồng', area: 'Biên Hòa' },
  { address: 'Trung tâm Tin học Ngoại Ngữ - cơ sở Long Khánh', area: 'Long Khánh' },
];
const course = [
  { title: 'AI Fantasy Zoo 1' },
  { title: 'AI Fantasy Zoo 2' },
  { title: 'AI Smart Life 1' },
  { title: 'AI Smart Life 2' },
  { title: 'AI Magic World' },
  { title: 'AI Magic World 2' },
  { title: 'AI Transformer Workshop 1' },
  { title: 'AI Transformer Workshop 2' },
  { title: 'AI Super Engineer 1' },
  { title: 'AI Super Engineer 2' }
];

const teacher = [
  { name: 'Hoàng Gia Huy' },
  { name: 'Võ Tuấn Sĩ' },
  { name: 'Nguyễn Hoàng Hưng' },
  { name: 'Nguyễn Duy Độ' },
  { name: 'Hoàng Thanh Nhật' },
  { name: 'Bùi Bình Minh' },
  { name: 'Phạm Bảo Minh Thế' },
  { name: 'Huỳnh Trần Hữu Nhật' },
  { name: 'Bùi Xuân Cảnh' },
  { name: 'Nguyễn Minh Sơn' },
  { name: 'Phan Thị Hường' }
];

function time(date) {
  return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
}

function addHoursToTime(hours, minutes, addHours) {
  let totalMinutes = Number(hours) * 60 + Number(minutes) + Number(addHours) * 60;
  const newHours = totalMinutes / 60
  const newMinutes = totalMinutes % 60;
  return { hours: newHours, minutes: newMinutes };
}