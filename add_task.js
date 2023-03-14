const taskBoardList = document.getElementById('taskBoardList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskCategory = document.getElementById('taskCategory');
const taskAssigned = document.getElementById('taskAssigned');
const taskDate = document.getElementById('taskDate');
const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');

// TODO  Übergabe des Button Text
//Zahl übergeben 
async function addTaskToUser() {

  let newTask = {
    boardList: taskBoardList.value,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskCategory.value,
    assigned_to: taskAssigned.value,
    date: taskDate.value,
    prio: '',
  };

  userData[0].board[0].boardlistTasks.push(newTask);
  await backend.setItem('users', JSON.stringify(userData));
  loadUsers();
}


function taskClearButton() {
  taskBoardList.value = '';
  taskTitle.value = '';
  taskDescription.value = '';
  taskCategory.value = '';
  taskAssigned.value = '';
  taskDate.value = '';
  taskButtonUrgent.value = '';
  taskButtonMedium.value = '';
  taskButtonLow.value = '';
}

function setPriority() {

  let taskButtonUrgent = document.getElementById('taskButtonUrgent');
  taskButtonUrgent.style.backgroundColor = "red";
  taskButtonUrgent.classList.add("active");

  let taskButtonMedium = document.getElementById('taskButtonMedium');
  taskButtonMedium.style.backgroundColor = "orange";
  taskButtonMedium.classList.add("active");

  let taskButtonLow = document.getElementById('taskButtonLow');
  taskButtonLow.style.backgroundColor = "green";
  taskButtonLow.classList.add("active");
}



// function generateContactDropdown(userData) {
//   const dropdownContacts = document.getElementById("taskAssigned");
//   dropdownContacts.innerHTML = '';

//   for (let i = 0; i < userData[0].contacts[0].avatar_initials.length; i++) {
//     const contactList =
//   }
// }

// userData[0].contacts[0].avatar_initials





// taskButtonUrgent.addEventListener('click', () => {
//   taskButtonUrgent.classList.toggle('active');
// });

// taskButtonMedium.addEventListener('click', () => {
//   taskButtonMedium.classList.toggle('active');
// });

// taskButtonLow.addEventListener('click', () => {
//   taskButtonLow.classList.toggle('active');
// });




