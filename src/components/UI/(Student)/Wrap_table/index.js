'use client'

import { useState, useEffect } from "react";
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from '@mui/material/Autocomplete';
import ButtonCreate from "@/app/student/createStudent"
import CustomPaginationActionsTable from "@/components/UI/(Student)/ListStudent"

const Area_ = ['Biên Hòa', 'Long Thành', 'Long Khánh'];
const Status_ = ['Đang học', 'Chờ lên khóa', 'Đã nghỉ']
const Type_ = ['Chính thức', 'Tạm thời']

export default function Wrap_table({ dataStudent, s }) {
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
        <p className="text_3_m">Bộ lọc học sinh</p>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, pb: 1, gap: 2 }}>
          <Autocomplete disablePortal options={Area_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setArea(value)}
            renderInput={(params) => <TextField {...params} label="Chọn khu vực" />} />
          <Autocomplete disablePortal options={Status_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setStatus(value)}
            renderInput={(params) => <TextField {...params} label="Chọn trạng thái" />} />
          <Autocomplete disablePortal options={Type_} sx={{ flex: 1 }} size="small" onChange={(event, value) => setType(value)}
            renderInput={(params) => <TextField {...params} label="Chọn loại" />} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
        <p className="text_3_m">Danh sách học sinh</p>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" size="small" sx={{ width: '300px' }} onChange={(e) => setSearchQuery(e.target.value)} />
          <ButtonCreate LoadID={s} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1, backgroundColor: 'var(--main)', height: '40px', alignItems: 'center' }}>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.3' }}></Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.5' }}>ID HỌC SINH</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>HỌ VÀ TÊN</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>LIÊN HỆ</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>KHU VỰC</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>NỢ HỌC PHÍ</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.5' }}>HÀNH ĐỘNG</Box>
      </Box>
      <CustomPaginationActionsTable student={data} />
    </Box>
  )
}