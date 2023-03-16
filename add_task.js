async function initTasks() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  userData = await JSON.parse(backend.getItem('users')) || [];
  getCurrentUser();
  let currentUserData = userData[currentUser];
  showCurrentUser(currentUser, currentUserData);
  // TODO Alle Boards abfragen!!
  if (
    userData[currentUser].board[0].boardlistTasks.length > 0 ||
    userData[currentUser].board[1].boardlistTasks.length > 0 ||
    userData[currentUser].board[2].boardlistTasks.length > 0 ||
    userData[currentUser].board[3].boardlistTasks.length > 0
  ) {
    renderTaskForm();
    generateContactDropdown();
  } else {
    console.warn('No tasks found');
    // templatefirstContact();
  }
}



const taskBoardList = document.getElementById('taskBoardList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskCategory = document.getElementById('taskCategory');
const taskAssigned = document.getElementById('taskAssigned');
const taskDate = document.getElementById('taskDate');
const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');


function renderTaskForm() {
  taskBoardList.innerHTML = ``;
  taskBoardList.innerHTML += `
  <option disabled selected hidden>Select board list</option>
        <option value="0">${userData[currentUser].board[0].boardlistTitle}</option>
        <option value="1">${userData[currentUser].board[1].boardlistTitle}</option>
        <option value="2">${userData[currentUser].board[2].boardlistTitle}</option>
        <option value="3">${userData[currentUser].board[3].boardlistTitle}</option>
  `;
  console.log("Jane is da!!");
}


function generateContactDropdown() {
  taskAssigned.innerHTML = ``;
  taskAssigned.innerHTML += `
  <option disabled selected hidden>Select Contacts to assign</option>
  <option>${userData[currentUser].firstName} ${userData[currentUser].LastName}</option>
 `;

  for (let i = 0; i < userData[currentUser].contacts.length; i++) {
    const contactsOptions = document.getElementById('taskAssigned');
    contactsOptions.innerHTML += `
    <option value="${userData[currentUser].contacts[i].firstName} 
  ${userData[currentUser].contacts[i].lastName}">
  ${userData[currentUser].contacts[i].firstName} 
  ${userData[currentUser].contacts[i].lastName}</option>
    `;
  }
}


// TODO  Übergabe des Button Text           

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
















