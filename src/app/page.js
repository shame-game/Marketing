import dynamic from 'next/dynamic';
import jwt from 'jsonwebtoken';
const Page_Overview_Manage = dynamic(() => import('@/page/overview/manage'));
import { cookies } from 'next/headers';

export default function Overview() {
  var role = cookies().get('u')?.value;
  if (role) {
    role = jwt.verify(role, process.env.JWT_SECRET)
  } else {
    role = ''
  }
  return (<>{role ? role.role.ID == 'MG' ? <Page_Overview_Manage /> : <>Xin chào {role.Name}</> : null}</>)
}