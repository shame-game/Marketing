'use client';

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Task_Create from "@/app/tasks/ui/Task_Create";
import Task_Read_List from "@/app/tasks/ui/Task_Read/Task_List";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Status_ = ["Đã hoàn thành", "Đang làm", "Bị trễ"];
const Type_ = ["Lập trình", "Chụp hình", "Viết nội dung", "Làm video"];

export default function Wrap_table({ dataTasks }) {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  // Tạo danh sách dự án
  const Project = useMemo(() => {
    return Object.values(
      dataTasks.reduce((acc, item) => {
        const projectName = item.Project;
        if (!acc[projectName]) {
          acc[projectName] = {
            name: projectName,
            length: 0,
            Detail: []
          };
        }
        acc[projectName].length += 1;
        acc[projectName].Detail.push({
          Task: item.Task,
          _id: item._id
        });
        return acc;
      }, {})
    );
  }, [dataTasks]);

  const [Area, setArea] = useState(null);
  const [Status, setStatus] = useState(null);
  const [Type, setType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Hàm lọc dữ liệu
  const filteredData = useMemo(() => {
    return dataTasks.filter((task) => {
      // Lọc theo dự án
      if (Area && task.Project !== Area.value) return false;

      // Lọc theo trạng thái
      if (Status && task.Status !== Status) return false;

      // Lọc theo loại
      if (Type && task.Type !== Type) return false;

      // Lọc theo từ khóa tìm kiếm (trên Task và Project)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTask = task.Task && task.Task.toLowerCase().includes(query);
        const matchProject = task.Project && task.Project.toLowerCase().includes(query);
        if (!matchTask && !matchProject) return false;
      }

      // Lọc theo ngày
      const taskStart = task.StartDate ? new Date(task.StartDate) : null;
      const taskEnd = task.EndDate ? new Date(task.EndDate) : null;

      if (startDate) {
        const filterStart = new Date(startDate);
        if (!taskStart || taskStart < filterStart) return false;
      }
      if (endDate) {
        const filterEnd = new Date(endDate);
        if (!taskEnd || taskEnd > filterEnd) return false;
      }

      return true;
    });
  }, [dataTasks, Area, Status, Type, searchQuery, startDate, endDate]);

  const handleClearFilters = () => {
    setArea(null);
    setStatus(null);
    setType(null);
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 'var(--box)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Thanh trên cùng */}
      <Box sx={{ borderBottom: 'thin solid var(--background_1)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderBottom: 'thin solid var(--background_1)', p: 2 }}>

          {/* Khu vực tìm kiếm và chọn ngày */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '2px 8px',
                backgroundColor: 'white',
                maxWidth: '300px',
                flex: 1
              }}
            >
              <SearchIcon sx={{ color: '#888', marginRight: '8px' }} />
              <InputBase
                placeholder="Tìm kiếm dự án hoặc công việc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: '450px',
                  p: '2px 0',
                  fontSize: '14px',
                  color: '#333',
                  '&::placeholder': {
                    color: '#aaa',
                  },
                }}
              />
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ p: 0, alignItems: 'center' }}>
                <DatePicker
                  defaultValue={dayjs('2022-04-17')}
                  size="small"
                  slotProps={{
                    textField: {
                      size: 'small',
                      sx: { fontSize: '14px', marginLeft: '6px !important' },
                    },
                  }} />
                <div style={{ height: '100%', marginLeft: '8px' }} className="flexCenter text_2">-</div>
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      sx: { fontSize: '14px', ml: '8px !important' },
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Task_Create />
            {(Area || Status || Type || searchQuery || startDate || endDate) && (
              <IconButton onClick={handleClearFilters} title="Xóa tất cả bộ lọc">
                <ClearIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* Khu vực các combobox lọc */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, gap: 2 }}>
          <Autocomplete
            disablePortal
            options={Project.map((project) => ({
              label: `${project.name} (${project.length} công việc)`,
              value: project.name,
            }))}
            sx={{ flex: 1 }}
            size="small"
            value={Area}
            onChange={(event, value) => setArea(value)}
            renderInput={(params) => <TextField {...params} label="Chọn dự án" />}
          />
          <Autocomplete
            disablePortal
            options={Status_}
            sx={{ flex: 1 }}
            size="small"
            value={Status}
            onChange={(event, value) => setStatus(value)}
            renderInput={(params) => <TextField {...params} label="Chọn trạng thái" />}
          />
          <Autocomplete
            disablePortal
            options={Type_}
            sx={{ flex: 1 }}
            size="small"
            value={Type}
            onChange={(event, value) => setType(value)}
            renderInput={(params) => <TextField {...params} label="Chọn loại" />}
          />
        </Box>
      </Box>

      {/* Header bảng */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          backgroundColor: 'var(--main)',
          height: '40px',
          alignItems: 'center'
        }}
      >
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>DỰ ÁN</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '2' }}>TÊN CÔNG VIỆC</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>BẮT ĐẦU</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>KẾT THÚC</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.7' }}>LOẠI</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '1' }}>NGƯỜI KIỂM DUYỆT</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.7', textAlign: 'center' }}>TRẠNG THÁI</Box>
        <Box sx={{ color: 'white', fontSize: '14px', fontWeight: '500', flex: '.3', textAlign: 'center' }}>THÊM</Box>
      </Box>

      {/* Danh sách task */}
      <Task_Read_List student={filteredData} />
    </Box>
  );
}
