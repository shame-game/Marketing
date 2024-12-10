

// Noti: Hàm hỗ trợ chuyển Họ và tên học sinh thành chuỗi không dấu (Hỗ trợ profile)
// Tham số truyền: Họ và tên học sinh
// Kết quả trả về: Chuỗi không cách không dấu
export function PassName(str) {
  const removeAccents = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  };
  return removeAccents(str)
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}


export function getMon2(data, month, year, areas) {
  const totalsByArea = areas.map(area => ({ Area: area.Name, total: 0 }));

  data.forEach(item => {
    const date = new Date(item.createdAt);
    const itemMonth = date.getMonth() + 1;
    const itemYear = date.getFullYear();

    if (itemMonth === month && itemYear === year) {
      const matchingArea = areas.find(area => area.Name === item.courseData.Area);
      if (matchingArea) {
        const areaIndex = totalsByArea.findIndex(total => total.Area === matchingArea.Name);
        if (areaIndex !== -1) {
          totalsByArea[areaIndex].total += item.Amount_paid;
        }
      }
    }
  });

  return totalsByArea;
}

export function getToday() {
  const now = new Date();
  const day = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return [day, currentMonth, currentYear]
}