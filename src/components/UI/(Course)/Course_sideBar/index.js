'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAdded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibrary';
import CourseWrapCoursePresent from '@/components/UI/(Course)/Course_sideBar/sever/Course_wrapCoursePresent';
import Nav from './sever/index';
import None from './sever/none';
import Bt_Add_Course from '../Course_create';
import TextField from '@mui/material/TextField';

export default function CourseSideBar({ data = [], data_book = [] }) {
  const [tabValue, setTabValue] = useState(0);
  const courseCounts = data.reduce(
    (counts, e) => {
      if (!e.Status) counts.inProgress += 1;
      else if (e.Status && e.Type === 'AI Robotic') counts.completed += 1;
      else if (e.Type !== 'AI Robotic') counts.review += 1;
      else if (e.Type === 'Trial Class') counts.program += 1;
      return counts;
    },
    { inProgress: 0, completed: 0, program: 0, review: 0 }
  );

  const tabs = [
    {
      label: 'Khóa học đang học',
      icon: <CollectionsBookmarkRoundedIcon />,
      count: courseCounts.inProgress,
      status: tabValue === 0,
      onClick: () => setTabValue(0),
      content: (
        <>
          {data_book.allBook.length ? <SearchBar data_book={data_book} status={true} /> : <SearchBar data_book={data_book} status={false} />}
          {courseCounts.inProgress ? (
            <CourseWrapCoursePresent data={data.filter((item) => !item.Status)} />
          ) : (
            <None />
          )}
        </>
      ),
    },
    {
      label: 'Khóa học hoàn thành',
      icon: <BookmarkAddedRoundedIcon />,
      count: courseCounts.completed,
      status: tabValue === 1,
      onClick: () => setTabValue(1),
      content: (
        <>
          {data_book.allBook.length ? <SearchBar data_book={data_book} status={true} /> : <SearchBar data_book={data_book} status={false} />}
          {courseCounts.completed ? (
            <CourseWrapCoursePresent
              data={data.filter(
                (item) => item.Status && item.Type === 'AI Robotic'
              )}
            />
          ) : (
            <None />
          )}
        </>
      ),
    },
    {
      label: 'Chương trình học',
      icon: <LocalLibraryRoundedIcon />,
      count: courseCounts.program,
      status: tabValue === 2,
      onClick: () => setTabValue(2),
      content: courseCounts.program ? <>Có tồn tại</> : <None />,
    },
    {
      label: 'Khóa ôn luyện',
      icon: <LocalLibraryRoundedIcon />,
      count: courseCounts.review,
      status: tabValue === 3,
      onClick: () => setTabValue(3),
      content: (
        <>
          {data_book.allBook.length ? <SearchBar data_book={data_book} status={true} /> : <SearchBar data_book={data_book} status={false} />}
          {courseCounts.completed ? (
            <CourseWrapCoursePresent
              data={data.filter(
                (item) => item.Type === 'Trial Class'
              )}
            />
          ) : (
            <None />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {/* Tab Navigation */}
      <Box
        sx={{
          display: 'flex',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          p: 2,
          backgroundColor: 'white',
          mb: 2,
          height: '70px',
        }}
      >
        {tabs.map((tab, index) => (
          <Box key={index} onClick={tab.onClick} sx={{ flex: 1 }}>
            <Nav
              icon={tab.icon}
              title={tab.label}
              sl={tab.count}
              status={tab.status}
            />
          </Box>
        ))}
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          height: 'calc(100% - 85px)',
        }}
      >
        {tabs[tabValue].content}
      </Box>
    </>
  );
}

// Extracted SearchBar component to reduce duplication
function SearchBar({ data_book, status }) {
  console.log(status);

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        p: 2,
        backgroundColor: 'white',
        mb: 2,
        justifyContent: 'space-between',
      }}
    >
      <TextField
        label="Tìm kiếm"
        variant="outlined"
        size="small"
        sx={{ mr: 2, width: '400px', color: 'var(--main)' }}
      />
      {status && <Bt_Add_Course data_book={data_book.allBook} />}
    </Box>
  );
}
