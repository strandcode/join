async function initTasks() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  userData = await JSON.parse(backend.getItem('users')) || [];
  getCurrentUser();
  let currentUserData = userData[currentUser];
  showCurrentUser(currentUser, currentUserData);
  setNavbarItemActive('.navbar-task');
  if (userData[currentUser].board) {
    renderTaskForm();
    generateContactDropdown();
  } else {
    console.warn('No tasks found');
    // templatefirstContact();
  }
}


let newTask = [];
let TaskContactsAll;
const taskBoardList = document.getElementById('taskBoardList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskCategory = document.getElementById('taskCategory');

const taskDate = document.getElementById('taskDate');
const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');
let taskButtonPriority = '';


// value Hermann Paschule 
const taskAssigned = 0; //TODO - 
let taskAssignedColor;
let taskAssignedInitials;


// TODO Alle Boards abfragen!!

function renderTaskForm() {
  taskDescription.value = '';
  taskBoardList.innerHTML = ``;
  taskBoardList.innerHTML += `
    <option disabled selected hidden>Select board list</option>
    <option value="0">${userData[currentUser].board[0].boardlistTitle}</option>
    <option value="1">${userData[currentUser].board[1].boardlistTitle}</option>
    <option value="2">${userData[currentUser].board[2].boardlistTitle}</option>
    <option value="3">${userData[currentUser].board[3].boardlistTitle}</option>
  `;
}


// TODO Mehrere Assign-To-Contacs
function generateContactDropdown() {
  taskAssigned.innerHTML = ``;
  taskAssigned.innerHTML += `
  <option disabled selected hidden>Select Contacts to assign</option>
  <option value="${userData[currentUser]}">
  ${userData[currentUser].firstName} ${userData[currentUser].LastName}</option>
 `;

  for (let i = 0; i < userData[currentUser].contacts.length; i++) {

    const contactsOptions = document.getElementById('taskAssigned');
    contactsOptions.innerHTML += `
    <option value="${i}">
      ${userData[currentUser].contacts[i].firstName} ${userData[currentUser].contacts[i].lastName}
    </option>
  `;
    taskAssignedColor = userData[currentUser].contacts[i].avatar_bg_color;
    taskAssignedInitials = userData[currentUser].contacts[i].avatar_initials;
  }

}


async function addTaskToUser() {

  let newTask = {
    task_id: userData[currentUser].tasks.length,
    boardList: taskBoardList.value,
    boardlistPosition: 0,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskCategory.value,
    assign_to_contacts: [taskAssigned],
    //TODO assign_to_contacts: [parseInt(taskAssigned.value)],
    date: taskDate.value,
    prio: taskButtonPriority,
  }

    ;

  userData[currentUser].tasks.push(newTask);
  await backend.setItem('users', JSON.stringify(userData));
  initTasks();

  taskButtonUrgent.style.backgroundColor = "";
  taskButtonUrgent.classList.remove("active");
  taskButtonMedium.style.backgroundColor = "";
  taskButtonMedium.classList.remove("active");
  taskButtonLow.style.backgroundColor = "";
  taskButtonLow.classList.remove("active");
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


// BUTTON SCRIPT
function setPriorityUrgent() {

  if (!taskButtonUrgent.classList.contains('active')) {
    taskButtonUrgent.style.backgroundColor = "red";
    taskButtonUrgent.classList.add("active");
    taskButtonPriority = "urgent";
    console.log(taskButtonUrgent);
  } else {
    taskButtonUrgent.style.backgroundColor = "";
    taskButtonUrgent.classList.remove("active");
    taskButtonPriority = '';
  }
}


function setPriorityMedium() {

  if (!taskButtonMedium.classList.contains('active')) {
    taskButtonMedium.style.backgroundColor = "orange";
    taskButtonMedium.classList.add("active");

    taskButtonPriority = "medium";
    console.log(taskButtonPriority);

  } else {
    taskButtonMedium.style.backgroundColor = "";
    taskButtonMedium.classList.remove("active");
    taskButtonPriority = '';
  }
}

function setPriorityLow() {

  let taskButtonLow = document.getElementById('taskButtonLow');
  if (!taskButtonLow.classList.contains('active')) {
    taskButtonLow.style.backgroundColor = "green";
    taskButtonLow.classList.add("active");

    taskButtonPriority = "low";
    console.log(taskButtonPriority);
  } else {
    taskButtonLow.style.backgroundColor = "";
    taskButtonLow.classList.remove("active");
    taskButtonPriority = '';
  }
}

function slideInImage() {
  let CreateTaskContainer = document.getElementById("slideInContainer");
  CreateTaskContainer.classList.add("active");

  setTimeout(function () {
    window.location.href = "board.html";
  }, 1500);
}
















