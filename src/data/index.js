

export function Task_Read_all() {
  return [
    {
      "_id": "675ff2d1524b74b98d1d2954",
      "project": '675fe6c8926de9f16d724937',
      "name": "Task 1 updated",
      "doer": "675908b348ba4e249526f52a",
      "startDate": "2021-07-22T00:00:00.000Z",
      "endDate": "2021-07-23T00:00:00.000Z",
      "checker": "675b8cf3a6513f6f001bfe66",
      "doerDone": true,
      "checkerDone": true,
      "linkDrive": "1kHjqfLMjaZ_aeA4wKkzUv1tltHn4DASX",
      "createdAt": "2024-12-16T09:28:49.723Z",
      "updatedAt": "2024-12-16T09:28:50.145Z",
      "taskCategory":"9e6F75b60e5dA8a2B77FA7A3",
      "__v": 0
    }
  ] 
}

export function Project_Read_all() {
  return [
    {
      "_id": "675fe6c8926de9f16d724937",
      "name": "Project 1",
      "piority": 1,
      "calendarId": "c_5616db43f815f3d287e6497f5526423bda6a27edced0dbb4ca2616949d8c20ad@group.calendar.google.com",
      "members": [],
      "linkDrive": "1j4TDNKpPoHTo3a55wLeGFKPWPmXxx4DA",
      "createdAt": "2024-12-16T08:37:28.870Z",
      "updatedAt": "2024-12-16T08:37:28.870Z",
      "__v": 0
    },
    {
      "_id": "675ff2ca524b74b98d1d2950",
      "name": "Project 2",
      "piority": 1,
      "calendarId": "c_314bad2b5223a1ff4becbd4a8a46bd0ee68ff4fa745ff3eb39b42f2dfe1654c6@group.calendar.google.com",
      "members": [],
      "linkDrive": "1-4vYaXgH4-U8MhjIbH22M298_oLUDJr0",
      "createdAt": "2024-12-16T09:28:42.974Z",
      "updatedAt": "2024-12-16T09:28:42.974Z",
      "__v": 0
    }
  ]
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

export function Task_Read_Type() {
  return [
    {
      "_id": "9e6F75b60e5dA8a2B77FA7A3",
      "name": "Content",
      "description": "Viết nội dung đúng tiêu chuẩn của nền tảng",
      "shouldCreateFolder": false
    },
    {
      "_id": "cb1fEdAEDcE6fEfe66a76DDF",
      "name": "Edit",
      "description": "Chỉnh sửa video theo nền tảng và tiêu chí order",
      "shouldCreateFolder": false
    },
    {
      "_id": "3Cb85CcE9b9aAbdE3dacbcbd",
      "name": "Post",
      "description": "Đăng bài phù hợp tất cả nền tảng và tiêu chí",
      "shouldCreateFolder": false
    },
    {
      "_id": "58c345Ba7F1BCbA9c8BeBBfB",
      "name": "Web SEO",
      "description": "Viết bài đạt chuẩn SEO, theo chủ đề và kế hoạch",
      "shouldCreateFolder": false
    },
    {
      "_id": "ACcdAD935f3C5e5Ed40Aec51",
      "name": "Plan",
      "description": "Đủ tiêu chí và quá trình",
      "shouldCreateFolder": false
    },
    {
      "_id": "EBCB26EDC7eB0653BccCdEFd",
      "name": "Quay",
      "description": "Quay video, theo chủ đề và kế hoạch",
      "shouldCreateFolder": false
    },
    {
      "_id": "3BC33223bd7bb87a6def4dAe",
      "name": "Design",
      "description": "Thiết kế ảnh, theo chủ đề và kế hoạch",
      "shouldCreateFolder": false
    },
    {
      "_id": "b7d3B0aC3ecBA097f77F2a2F",
      "name": "Photo",
      "description": "Chụp hình sự kiện, theo chủ đề và kế hoạch",
      "shouldCreateFolder": false
    },
    {
      "_id": "4F18eCDd3fd5bDfB2D134c5F",
      "name": "Ads",
      "description": "Chạy quảng cáo theo chiến dịch",
      "shouldCreateFolder": false
    },
    {
      "_id": "b746b5eAEA56abfBe3719543",
      "name": "Event",
      "description": "Lên kế hoạch và tổ chức sự kiện.",
      "shouldCreateFolder": false
    },
    {
      "_id": "C9D7F94F0247Ffc6cbe5dCc3",
      "name": "Coordinator",
      "description": "Điều phối viên theo sự kiện",
      "shouldCreateFolder": false
    }
  ]
}