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
  <option id="contactsOptions"></option>
  <option value="${userData[currentUser].contacts[0].firstName} 
  ${userData[currentUser].contacts[0].lastName}">
  ${userData[currentUser].contacts[0].firstName} 
  ${userData[currentUser].contacts[0].lastName}</option> `;

  for (let i = 0; i < userData[currentUser].contacts.length; i++) {
    const contactsOptions = document.getElementById('contactsOptions');
    // contactsOptions.innerHTML = ``;
    contactsOptions.innerHTML += `
    <option disabled selected hidden value="${userData[currentUser].contacts[i].firstName} 
  ${userData[currentUser].contacts[i].lastName}">
  ${userData[currentUser].contacts[i].firstName} 
  ${userData[currentUser].contacts[i].lastName}</option>
    `;
  }
}


// TODO  Übergabe des Button Text

async function addTaskToUser() {

  let newTask = {
    boardList: taskBoardList.value, //Zahl übergeben DONE!
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










// taskButtonUrgent.addEventListener('click', () => {
//   taskButtonUrgent.classList.toggle('active');
// });

// taskButtonMedium.addEventListener('click', () => {
//   taskButtonMedium.classList.toggle('active');
// });

// taskButtonLow.addEventListener('click', () => {
//   taskButtonLow.classList.toggle('active');
// });




