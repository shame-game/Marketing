import Course_sideBar from '@/components/UI/(Course)/Course_sideBar';
import { GetAllBook } from '@/app/api/getBooks';
import fetchApi from '@/utils/API_suport/fetchData';
import GetPerSever from '@/utils/GetPerSever'

export default async function CoursePage() {
  const per = await GetPerSever()
  const hasPermission = per.role?.Permission?.Course?.read && per.role.Permission.Course.read.level !== 'Block';
  let data = null;

  if (hasPermission) {
    try {
      data = await fetchApi('/Course_Read/all', { method: 'POST', body: JSON.stringify({ source: 1 }) });
    } catch (error) {
      data = null
    }
  }

  const isManagerRole = per.role?.Permission?.Course?.create.level == 'All'

  let data_book = null;
  if (isManagerRole) {
    try {
      data_book = await GetAllBook().catch((error) => { return null })
    } catch (error) {
      data_book = null;
    }
  }

  return (
    <Course_sideBar data={data} data_book={data_book || []} />
  );
}