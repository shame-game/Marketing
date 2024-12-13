import Course_sideBar from '@/components/UI/(Course)/Course_sideBar';
import fetchApi from '@/utils/API_suport/fetchData';

export default async function CoursePage() {
  let data = null;

  try {
    data = await fetchApi('/Course_Read/all', { method: 'POST', body: JSON.stringify({ source: 1 }) });
  } catch (error) {
    data = null
  }

  data = [
    {
      "_id": "6725e8e0486d967af899732a",
      "ID": "24SL1004",
      "Name": "AI Smart Life 1",
      "Address": "Lab B304 - Trường Đại học Lạc Hồng",
      "Status": false,
      "TimeEnd": "03/11/2024",
      "TimeStart": "15/12/2024",
      "Type": "AI Robotic",
      "Detail": [
        {
          "Day": "03/11/2024",
          "Topic": "Đèn để bàn thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD02",
          "Teacher": "Hoàng Thanh Nhật",
          "TeachingAs": "",
          "Image": "1iRAZN8DShM7lSdiRdutIe7Svvk9T_x3K"
        },
        {
          "Day": "10/11/2024",
          "Topic": "Quạt điện thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD03",
          "Teacher": "Nguyễn Khắc Hoàng",
          "TeachingAs": null,
          "Image": "1AoPFouKO6cvUB8mr-zvd9ikeOyWUnJyH",
          "ImageLink": [
            "https://lh3.googleusercontent.com/d/1Sh-D4oYwMJed1LNRB3ZBXCxoyRSYrmNE",
            "https://lh3.googleusercontent.com/d/16xUhXLmPBGykokBEk3Xk7QRLa5xo1oTd",
            "https://lh3.googleusercontent.com/d/1vssLU386iZMs1kWGv2zPgwfbBJTfnqIr",
            "https://lh3.googleusercontent.com/d/1P3u358lZhwZgrk-whI-YwvUPmDfG82HJ",
            "https://lh3.googleusercontent.com/d/1mJIfSROGjFlLdXtdwrsK71ZarjlVS4sn",
            "https://lh3.googleusercontent.com/d/19Kz3i_KnUPAtOcSPx-D8j1tanTp-MVq5",
            "https://lh3.googleusercontent.com/d/1NZJKDby7TTeh2jNpOyuTV8RE4F8KDt2q",
            "https://lh3.googleusercontent.com/d/1DYCuXy18YG4Ze0X6jMI6ycfztNlO4NhV",
            "https://lh3.googleusercontent.com/d/16JPnoigV6UCB1GVBoykHG3YZJucIuzCa",
            "https://lh3.googleusercontent.com/d/1ED8GWJvAxxTCfTekage5V8HbKsw-zhDB",
            "https://lh3.googleusercontent.com/d/153Zzxdt0ZGZTBg4eScWV09MJrWAF8Q_V",
            "https://lh3.googleusercontent.com/d/1PyHmkNh2vNXdyvBtaPw4RK-1KT52YL48",
            "https://lh3.googleusercontent.com/d/1Ukaxm7szecXEYxmT_fmJLVA2Os8xY_C9",
            "https://lh3.googleusercontent.com/d/1dKQ1DaDG22LtyjJtLo1YrDaAAXQda5wk",
            "https://lh3.googleusercontent.com/d/1umT4GtW2yx_U7JcuoVjtBXYqZAaRwotr",
            "https://lh3.googleusercontent.com/d/1_lynpgdN44JnUQRcAdKsCLabg5PmDjRZ",
            "https://lh3.googleusercontent.com/d/151u2FzoUhbuzmFuOtvs9chX4Aj8Jo4GO",
            "https://lh3.googleusercontent.com/d/1DLYcHjdIwP8SHHX7VBvHW_lEAuHSxMZK",
            "https://lh3.googleusercontent.com/d/1HsERQiqqxMIV5j50muAme8H6FK7vHiaw"
          ]
        },
        {
          "Day": "17/11/2024",
          "Topic": "Thùng rác thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD04",
          "Teacher": "Nguyễn Khắc Hoàng",
          "TeachingAs": "",
          "Image": "1jKviQiZAp6y3ck9QwTxJCamYHQHS8T_x",
          "ImageLink": [
            "https://lh3.googleusercontent.com/d/1AzzSXioKISg0fpNGl98Og4VBOVirXXjS",
            "https://lh3.googleusercontent.com/d/1_gT_EW1OXenB97wxwMqtcrFVDL-khnrK",
            "https://lh3.googleusercontent.com/d/1i31aZPdp7Si9sMzh4-pPdZwxVbb0owOh",
            "https://lh3.googleusercontent.com/d/1W1wJ73HLmAtxERei91DRVNLeRCtQiOrm",
            "https://lh3.googleusercontent.com/d/1KLE70vDt2PQMTMmXWqLZbqOe5VDFSsXW"
          ]
        },
        {
          "Day": "24/11/2024",
          "Topic": "Tiết sinh hoạt - Cải tiến đồ nội thất",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD05",
          "Teacher": "Trần Đại Nguyên",
          "TeachingAs": "",
          "Image": "1VMsm8_nU-JUbE_EA6eN-vsawiiAh3fJw"
        },
        {
          "Day": "01/12/2024",
          "Topic": "Vườn hoa thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD06",
          "Teacher": "Nguyễn Hoàng Hưng",
          "TeachingAs": "",
          "Image": "17gvd5I8OzAOa0T45ftWeb1RytDACWUEz"
        },
        {
          "Day": "08/12/2024",
          "Topic": "Giá phơi đồ thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD07",
          "Teacher": "Nguyễn Hoàng Hưng",
          "TeachingAs": "",
          "Image": "15hDrjhvyQ4blAG5aWkVtZZv1Dix18T8d"
        },
        {
          "Day": "15/12/2024",
          "Topic": "Tiết sinh hoạt - Ngôi nhà thông minh",
          "Room": "T&A",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD08",
          "Teacher": "Nguyễn Hoàng Hưng",
          "TeachingAs": "",
          "Image": "1bwIoi_SrbFEi3E9UnPCAMdM4rxzCnjJs"
        }
      ],
      "Area": "Biên Hòa",
      "Student": [
        {
          "ID": "AI0067",
          "_id": "66e3c783944a49b1c957914c",
          "Name": "Phạm Gia Bảo",
          "Learn": {
            "SL_CD02": {
              "Checkin": 3,
              "Cmt": "",
              "Note": "Bận"
            },
            "SL_CD03": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Kiên trì và cầu tiến",
                "Tích cực hợp tác và tương tác",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Khắc phục tính dễ nản khi gặp bài khó",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD04": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ]
            },
            "SL_CD05": {
              "Checkin": "2",
              "Cmt": ""
            },
            "SL_CD06": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Tích cực hợp tác và tương tác",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Khắc phục tính dễ nản khi gặp bài khó"
              ]
            },
            "SL_CD07": {
              "Checkin": "2",
              "Cmt": ""
            },
            "SL_CD08": {
              "Checkin": 0,
              "Cmt": ""
            }
          }
        },
        {
          "ID": "AI0068",
          "_id": "66e3c804944a49b1c957914f",
          "Name": "Phạn Gia Hân",
          "Learn": {
            "SL_CD02": {
              "Checkin": 3,
              "Cmt": "",
              "Note": "Bận "
            },
            "SL_CD03": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Tích cực hợp tác và tương tác",
                "Thiếu tập trung trong giờ học",
                "Sáng tạo và linh hoạt",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình",
                "Khắc phục tính dễ nản khi gặp bài khó"
              ]
            },
            "SL_CD04": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực hợp tác và tương tác",
                "Kết quả học tập ổn định",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ]
            },
            "SL_CD05": {
              "Checkin": "2",
              "Cmt": ""
            },
            "SL_CD06": {
              "Checkin": "1",
              "Cmt": [
                "Kiên trì và cầu tiến",
                "Thiếu tập trung trong giờ học",
                "Kết quả học tập ổn định",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cần tăng cường sự tập trung",
                "Cải thiện tính tự giác"
              ]
            },
            "SL_CD07": {
              "Checkin": "2",
              "Cmt": ""
            },
            "SL_CD08": {
              "Checkin": 0,
              "Cmt": ""
            }
          }
        },
        {
          "ID": "AI0122",
          "_id": "6725ea98c26a89c6dad96639",
          "Name": "Hồ Thiện Minh",
          "Learn": {
            "SL_CD02": {
              "Checkin": "1",
              "Cmt": ""
            },
            "SL_CD03": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực và chủ động",
                "Nhiệt tình và chăm chỉ",
                "Hạn chế trong việc lắng nghe và tiếp thu ý kiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cần tăng cường sự tập trung",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình",
                "Tăng cường tính tương tác trong giờ học"
              ]
            },
            "SL_CD04": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Thiếu tập trung trong giờ học",
                "Còn hạn chế ở một số kiến thức nâng cao",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD05": {
              "Checkin": "1",
              "Cmt": [
                "Sáng tạo và linh hoạt",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ]
            },
            "SL_CD06": {
              "Checkin": "3",
              "Cmt": ""
            },
            "SL_CD07": {
              "Checkin": "2",
              "Cmt": ""
            },
            "SL_CD08": {
              "Checkin": 0,
              "Cmt": ""
            }
          }
        },
        {
          "ID": "AI0121",
          "_id": "6725ea4ac26a89c6dad96637",
          "Name": "Lê Minh Tuấn",
          "Learn": {
            "SL_CD02": {
              "Checkin": "1",
              "Cmt": ""
            },
            "SL_CD03": {
              "Checkin": "1",
              "Cmt": [
                "Kiên trì và cầu tiến",
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cải thiện tính tự giác",
                "Tăng cường tính tương tác trong giờ học",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD04": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cải thiện tính tự giác"
              ]
            },
            "SL_CD05": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực và chủ động",
                "Kết quả học tập ổn định",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD06": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Kiên trì và cầu tiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD07": {
              "Checkin": "1",
              "Cmt": [
                "Sáng tạo và linh hoạt",
                "Nhiệt tình và chăm chỉ",
                "Kiên trì và cầu tiến",
                "Tích cực và chủ động",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Thể hiện tư duy tốt nhưng cần thêm thời gian để hoàn thiện",
                "Cần cải thiện kỹ năng trình bày và làm việc nhóm",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình",
                "Tăng cường tính tương tác trong giờ học"
              ]
            },
            "SL_CD08": {
              "Checkin": 0,
              "Cmt": ""
            }
          }
        },
        {
          "ID": "AI0120",
          "_id": "6725e9e3c26a89c6dad96633",
          "Name": "Lữ Gia Khang",
          "Learn": {
            "SL_CD02": {
              "Checkin": "1",
              "Cmt": ""
            },
            "SL_CD03": {
              "Checkin": "1",
              "Cmt": [
                "Kiên trì và cầu tiến",
                "Tích cực hợp tác và tương tác",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Thể hiện tư duy tốt nhưng cần thêm thời gian để hoàn thiện",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cải thiện tính tự giác",
                "Tăng cường tính tương tác trong giờ học",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ],
              "Note": "\n"
            },
            "SL_CD04": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Kết quả học tập ổn định",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD05": {
              "Checkin": "1",
              "Cmt": [
                "Sáng tạo và linh hoạt",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Phát triển tư duy phân tích",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ]
            },
            "SL_CD06": {
              "Checkin": "1",
              "Cmt": [
                "Thiếu tập trung trong giờ học",
                "Hạn chế trong việc lắng nghe và tiếp thu ý kiến",
                "Kết quả học tập ổn định",
                "Cần cải thiện kỹ năng trình bày và làm việc nhóm",
                "Cần tăng cường sự tập trung",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ]
            },
            "SL_CD07": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Sáng tạo và linh hoạt",
                "Tích cực và chủ động",
                "Kiên trì và cầu tiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ]
            },
            "SL_CD08": {
              "Checkin": 0,
              "Cmt": ""
            }
          }
        }
      ],
      "TeacherHR": "673aa9978b4cf25e2cd18d0d",
      "Image": "14_2DDQN_79jPz8oUJqphP9HXbZe3srRA"
    },
    {
      "_id": "672f13241ddc73cdb94aec77",
      "ID": "24SL2003",
      "Name": "AI Smart Life 2",
      "Address": "Lab B304 - Trường Đại học Lạc Hồng",
      "Status": false,
      "TimeEnd": "10/11/2024",
      "TimeStart": "22/12/2024",
      "Type": "AI Robotic",
      "Detail": [
        {
          "Day": "10/11/2024",
          "Topic": "Máy phát nhạc",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD09",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1wEfjfHPLfPn6EFtkjCMYO7RtVH5SJ_NX"
        },
        {
          "Day": "17/11/2024",
          "Topic": "Chuông báo thông minh",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD10",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1m4MwbO1GoW4LgxQobYuIpruGJOTalVkr"
        },
        {
          "Day": "24/11/2024",
          "Topic": "Xe dọn rác thông minh",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD11",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1cf_TWPKCaBPAvqJ7kRZW446W_Jap9k-J"
        },
        {
          "Day": "01/12/2024",
          "Topic": "Trợ lý cảnh sát giao thông",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD12",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1ALtFVo2aTARFiRVdbNW9sGOwXmCByU_4"
        },
        {
          "Day": "08/12/2024",
          "Topic": "Cửa điện",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD14",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1Y4Bv1qFWOTMsD6eoZMPSsDozZCzqmXEQ"
        },
        {
          "Day": "15/12/2024",
          "Topic": "Cánh tay robot phân loại",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD15",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1-XJ3jGNR9WrsI7K7h2eoibEYKuGpta5E"
        },
        {
          "Day": "22/12/2024",
          "Topic": "Tiết sinh hoạt - Cuộc sống AI - Công nghệ AI",
          "Room": "B304",
          "Time": "08:00-11:00",
          "Lesson": 4,
          "ID": "SL_CD16",
          "Teacher": "Võ Tuấn Sĩ",
          "TeachingAs": "",
          "Image": "1860vEZuLqncZc74XQffQ1PFnGSidMvg-"
        }
      ],
      "Area": "Biên Hòa",
      "Student": [
        {
          "ID": "AI0123",
          "_id": "672ef51da78be985fb1d8f75",
          "Name": "Trần Đình Dương",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Thiếu tập trung trong giờ học",
                "Hạn chế trong việc lắng nghe và tiếp thu ý kiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Cần tăng cường sự tập trung",
                "Tăng cường tính tương tác trong giờ học"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        },
        {
          "ID": "AI0098",
          "_id": "66e3dcfb161c061aba82007b",
          "Name": "Vũ Quốc Tấn",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực và chủ động",
                "Kiên trì và cầu tiến",
                "Kết quả học tập ổn định",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cải thiện tính tự giác",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "2",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Kết quả học tập ổn định",
                "Cải thiện tính tự giác"
              ],
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Kết quả học tập ổn định",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        },
        {
          "ID": "AI0021",
          "_id": "66e3c038944a49b1c95790b6",
          "Name": "Nguyễn Hoàng Duy",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Thiếu tập trung trong giờ học",
                "Hạn chế trong việc lắng nghe và tiếp thu ý kiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Cải thiện tính tự giác",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "2",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Thể hiện tư duy tốt nhưng cần thêm thời gian để hoàn thiện",
                "Phát triển tư duy phân tích"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        },
        {
          "ID": "AI0062",
          "_id": "66e3c6af944a49b1c957913d",
          "Name": "Nguyễn Phạm Việt Hoàn",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Kết quả học tập ổn định",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cải thiện tính tự giác",
                "Cần tăng cường sự tập trung",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực và chủ động",
                "Thể hiện tư duy tốt nhưng cần thêm thời gian để hoàn thiện",
                "Khắc phục tính dễ nản khi gặp bài khó"
              ],
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Khắc phục tính dễ nản khi gặp bài khó"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        },
        {
          "ID": "AI0063",
          "_id": "66e3c726944a49b1c9579140",
          "Name": "Phạm Lê Vĩnh Kỳ",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Tích cực và chủ động",
                "Hạn chế trong việc lắng nghe và tiếp thu ý kiến",
                "Kết quả học tập ổn định",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Còn hạn chế ở một số kiến thức nâng cao",
                "Cần tăng cường sự tập trung",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình",
                "Cải thiện tính tự giác"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Kiên trì và cầu tiến",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cần tăng cường sự tập trung"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        },
        {
          "ID": "AI0099",
          "_id": "66e5db66d464a97428a8f228",
          "Name": "Nguyễn Khôi Nguyên",
          "Learn": {
            "SL_CD09": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD10": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Tích cực và chủ động",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Kết quả học tập ổn định",
                "Tiềm năng lớn nhưng chưa tối đa hóa",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình",
                "Chú ý hơn đến cách trình bày và tính cẩn thận"
              ],
              "Note": ""
            },
            "SL_CD11": {
              "Checkin": "1",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD12": {
              "Checkin": "2",
              "Cmt": "",
              "Note": ""
            },
            "SL_CD14": {
              "Checkin": "1",
              "Cmt": [
                "Nhiệt tình và chăm chỉ",
                "Nắm bắt tốt các kiến thức cơ bản",
                "Cố gắng tiếp tục phát huy những điểm mạnh của mình"
              ],
              "Note": ""
            },
            "SL_CD15": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            },
            "SL_CD16": {
              "Checkin": 0,
              "Cmt": "",
              "Note": ""
            }
          }
        }
      ],
      "TeacherHR": "Võ Tuấn Sĩ"
    }
  ]


  return (
    <Course_sideBar data={data} />
  );
}
