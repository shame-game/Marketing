
import Grid from '@mui/material/Unstable_Grid2';
import Left from "./left"
import Right from './right'
import { GetStudentByID } from '@/app/api/Student'
import fetchApi from '@/utils/API_suport/fetchData';

export default async function Page({ params }) {
  let dataStudent = await GetStudentByID(params.id_student[0]);
  dataStudent = dataStudent.student
  let images = {};
  try {
    const courseIds = Object.keys(dataStudent.Course).filter((courseId) => courseId);
    if (courseIds.length === 0) { console.log('Không có khóa học nào có StatusLearn: true'); }
    else {
      const imagePromises = courseIds.map(async (courseId) => {
        try {
          const response = await fetchApi('/getImage', { method: 'POST', body: JSON.stringify({ source: 1, course: courseId }), });
          const courseSessions = response[courseId];

          if (!Array.isArray(courseSessions)) {
            console.warn(`Không tìm thấy phiên nào cho khóa học ${courseId}`);
            return;
          }
          let imagesArray = [];
          for (const session of courseSessions) {
            const sessionImages = session.ImageLink; if (sessionImages) {
              imagesArray = imagesArray.concat(sessionImages);
            }
          }
          images[courseId] = imagesArray.flat(Infinity);
        } catch (error) { console.error(`Lỗi khi tải hình ảnh cho khóa học ${courseId}:`, error); }
      });
      await Promise.all(imagePromises);
    }
  } catch (error) { images = null; console.error('Lỗi trong khi tải hình ảnh:', error); }

  return (
    <Grid container spacing={2} sx={{ height: 'calc(100% - 0px)' }}>
      <Grid xs={12} md={3.5} lg={3.5} sx={{ height: '100%' }}>
        <Left children={dataStudent} />
      </Grid>
      <Grid xs={12} md={8.5} lg={8.5} sx={{ height: '100%' }}>
        <Right children={dataStudent} image={images} />
      </Grid>
    </Grid>
  )
}