async function addTaskToUser() {
  let taskTitle = document.getElementById('taskTitle');
  // let taskTitle = document.getElementById('taskTitle');
  // let taskTitle = document.getElementById('taskTitle');
  // let taskTitle = document.getElementById('taskTitle');
  // let taskTitle = document.getElementById('taskTitle');
  let subtaskTitle = document.getElementById('subtaskTitle');

  let newTask = {
    title: taskTitle.value,
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

