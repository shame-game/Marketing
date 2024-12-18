import Course_sideBar from '@/components/UI/(Course)/Course_sideBar';
import { Project_Read_all, Department_Read_all, Project_Read_Status } from '@/app/data';

export default async function CoursePage() {
  let data = await Project_Read_all()
  let department = await Department_Read_all()
  let statusProject = Project_Read_Status()
  return (
    <Course_sideBar data={data} department={department} statusProject={statusProject} />
  );
}
