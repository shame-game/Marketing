export function getUserByProject(user, project, task) {
  let g;
  for (let i in project) {
    if (project[i]._id == task.project) g = project[i]
  }

  const allUserIds = new Set([
    task.doer,
    task.checker,
    ...g.leader,
    ...g.members
  ]);
  const userMap = user.reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});
  return Array.from(allUserIds).map(userId => {
    const u = userMap[userId];
    if (u) {
      return { _id: u._id, Name: u.Name };
    } else {
      return null;
    }
  }).filter(Boolean);
}

export function setValueInpue(data, label, value) {
  return data.map(item => ({
    label: item[`${label}`],
    value: item[`${value}`]
  }));
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0'); 
  return `${year}-${month}-${day}`;
}