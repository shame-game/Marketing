import RoleList from '@/components/UI/(Personnal)/RoleList';
import UserList from '@/components/UI/(Personnal)/UserList';
import fetchApi from '@/utils/API_suport/fetchData';

export default async function Page_Personnel() {
  let allUser;
  let allPer;
  try {
    allPer = await fetchApi('/Permissions_Read/all', { method: 'POST', body: JSON.stringify({ source: 1 }) })
    allUser = await fetchApi('/User_Read/all', { method: 'POST', body: JSON.stringify({ source: 1 }) })
  } catch (error) {
    allUser = null
    allPer = null
  }
  return (
    <>
      <RoleList data={allUser} per={allPer} />
      <UserList data={allUser} />
    </>
  );
}