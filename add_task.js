async function addTaskToUser() {
  let taskBoardList = document.getElementById('taskBoardList');
  let taskTitle = document.getElementById('taskTitle');
  let taskDescription = document.getElementById('taskDescription');
  let taskCategory = document.getElementById('taskCategory');
  let taskAssigned = document.getElementById('taskAssigned');
  let taskDate = document.getElementById('taskDate');
  let taskButtonUrgent = document.getElementById('taskButtonUrgent');
  let ttaskButtonMedium = document.getElementById('taskButtonMedium');
  let taskButtonLow = document.getElementById('taskButtonLow');
  let subtaskTitle = document.getElementById('subtaskTitle');

  let newTask = {
    boardList: taskBoardList.value,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskCategory.value,
    assigned_to: taskAssigned.value,
    date: taskDate.value,


    subtasks: [
      {
        subtaskTitle: subtaskTitle.value,
        subtaskChecked: false,
      }
    ]
  }
  userData[0].tasks.push(newTask);
  await backend.setItem('users', JSON.stringify(userData));
  loadUsers();
}

// function renderBoradList() {
//   let taskBoardList
//   for
//   taskBoardList.innerHTML = `
//   <option value="">${userData[4].board[i].boardlistTitle}</option>
//   `;
// }


function taskClearButton() {
  document.getElementById('taskBoardList').value = '';
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription');
  document.getElementById('taskCategory');
  document.getElementById('taskAssigned');
  document.getElementById('taskDate');
  document.getElementById('taskButtonUrgent');
  document.getElementById('taskButtonMedium');
  document.getElementById('taskButtonLow');
}
