'use client'

import { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from '@mui/material/Autocomplete';
import { Task_Read_all } from '@/data'
import Task_Create from "@/app/tasks/ui/Task_Create";
import Task_Read_List from "@/app/tasks/ui/Task_Read/Task_List";

const Area_ = ['Việc nhà', 'Lau nhà'];
const Status_ = ['Đã hoàn thành', 'Đang làm', 'Bị trễ']
const Type_ = ['Chính thức', 'Tạm thời']
const dataStudent = Task_Read_all()

export default function Wrap_table({ s }) {
  const [data, setdata] = useState(dataStudent)
  const [Area, setArea] = useState(null);
  const [Status, setStatus] = useState(null);
  const [Type, setType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    let filteredData = dataStudent;
    if (Area) filteredData = filteredData.filter((student) => student.Address === Area)
    if (Status) filteredData = filteredData.filter((student) => student.Status === Status)
    if (Type) filteredData = filteredData.filter((student) => student.Type === Type)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (student) =>
          student.ID.toString().includes(query) || student.Name.toLowerCase().includes(query)
      );
    }
    setdata(filteredData);
  }, [Area, Status, Type, searchQuery, dataStudent]);

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 'var(--box)', overflow: 'hidden' }}>
      <Box sx={{ p: 2, alignItems: 'center', borderBottom: 'thin solid var(--background_1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="text_3">Bộ lọc học sinh</p>
          <Task_Create LoadID={s} />
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, pb: 1, gap: 2 }}>
          <Autocomplete disablePortal options={Area_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setArea(value)}
            renderInput={(params) => <TextField {...params} label="Chọn dự án" />} />
          <Autocomplete disablePortal options={Status_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setStatus(value)}
            renderInput={(params) => <TextField {...params} label="Chọn trạng thái" />} />
          <Autocomplete disablePortal options={Type_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setType(value)}
            renderInput={(params) => <TextField {...params} label="Chọn loại" />} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1, backgroundColor: 'var(--main)', height: '40px', alignItems: 'center' }}>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>DỰ ÁN</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '2' }}>CÔNG VIỆC</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>BẮT ĐẦU</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>KẾT THÚC</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>CHI TIẾT </Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>TRẠNG THÁI</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1', textAlign: 'center' }}>HÀNH ĐỘNG</Box>
      </Box>
      <Task_Read_List student={data} />
    </Box>
  )
}

