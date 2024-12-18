import Course_sideBar from '@/components/UI/(Course)/Course_sideBar';
import { Project_Read_all } from '@/app/data';

export default async function CoursePage() {
  let data;
  data = Project_Read_all()

  return (
    <Course_sideBar data={data} />
  );
}
