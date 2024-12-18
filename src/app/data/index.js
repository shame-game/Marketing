'use sever'
import fetchApi from "@/utils/API_suport/fetchData";

var dataTask = []
export async function Task_Read_all() {
  try {
    dataTask = await fetchApi('/task', { method: 'POST', body: { source: 1 } });
  } catch (error) {
    dataTask = null
  }
  return dataTask
}

export async function Project_Read_all() {
  let data
  try {
    data = await fetchApi('/project', { method: 'POST', body: { source: 1 } });
  } catch (error) {
    data = null
  }
  return data
  // return [
  //   {
  //     "_id": "675fe6c8926de9f16d724937",
  //     "name": "Project 1",
  //     "piority": 1,
  //     "calendarId": "c_5616db43f815f3d287e6497f5526423bda6a27edced0dbb4ca2616949d8c20ad@group.calendar.google.com",
  //     "members": [],
  //     "linkDrive": "1j4TDNKpPoHTo3a55wLeGFKPWPmXxx4DA",
  //     "leader":"675b8cf3a6513f6f001bfe66",
  //     "createdAt": "2024-12-16T08:37:28.870Z",
  //     "updatedAt": "2024-12-16T08:37:28.870Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "675ff2ca524b74b98d1d2950",
  //     "name": "Project 2",
  //     "piority": 1,
  //     "calendarId": "c_314bad2b5223a1ff4becbd4a8a46bd0ee68ff4fa745ff3eb39b42f2dfe1654c6@group.calendar.google.com",
  //     "members": [],
  //     "linkDrive": "1-4vYaXgH4-U8MhjIbH22M298_oLUDJr0",
  //     "leader":"675b8cf3a6513f6f001bfe66",
  //     "createdAt": "2024-12-16T09:28:42.974Z",
  //     "updatedAt": "2024-12-16T09:28:42.974Z",
  //     "__v": 0
  //   }
  // ]
}

export function User_Read_all() {
  return [
    {
      "_id": "675908b348ba4e249526f52a",
      "Name": "Nguyễn Hoàng Hưng",
      "Address": "",
      "Phone": "0833911375",
      "Email": "hoanghung.vam1209@gmail.com",
      "__v": 0,
      "Role": "Quản lý"
    },
    {
      "_id": "675b8cf3a6513f6f001bfe66",
      "Name": "Tran Trinh",
      "Address": "",
      "Role": "Quản lý",
      "Phone": "0839620866",
      "Email": "trandiepkhanhtrinh@gmail.com",
      "__v": 0
    }
  ]
}

export async function Task_Read_Type() {
  let data
  try {
    data = await fetchApi('/task_type', { method: 'POST', body: { source: 1 } });
  } catch (error) {
    data = null
  }
  return data
}
