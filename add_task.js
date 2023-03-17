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


let newTask = [];
let TaskContactsAll;
const taskBoardList = document.getElementById('taskBoardList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskCategory = document.getElementById('taskCategory');
const taskAssigned = document.getElementById('taskAssigned');
let taskAssignedColor;
let taskAssignedInitials;
const taskDate = document.getElementById('taskDate');
const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');
let taskButtonPriority = '';


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
  <option value="${userData[currentUser].firstName} ${userData[currentUser].LastName}">
  ${userData[currentUser].firstName} ${userData[currentUser].LastName}</option>
 `;

  for (let i = 0; i < userData[currentUser].contacts.length; i++) {

    const contactsOptions = document.getElementById('taskAssigned');
    contactsOptions.innerHTML += `
    <option value="${userData[currentUser].contacts[i].firstName} ${userData[currentUser].contacts[i].lastName}">
     
      ${userData[currentUser].contacts[i].firstName} ${userData[currentUser].contacts[i].lastName}
    </option>
  `;
    taskAssignedColor = userData[currentUser].contacts[i].avatar_bg_color;
    taskAssignedInitials = userData[currentUser].contacts[i].avatar_initials;
  }

}




async function addTaskToUser() {



  let newTask = {
    // TODO Wird über die Position im array userData[currentUser].tasks geschrieben userDat[cU]tasks.length +1 (newTaskId)
    task_id: 0,
    boardList: 0,
    boardlistPosition: 0,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskCategory.value,
    assigned_to: taskAssigned.value,
    avatar_initials: taskAssignedInitials,
    avatar_bg_color: taskAssignedColor,
    date: taskDate.value,
    prio: taskButtonPriority,
  };

  userData[currentUser].tasks.push(newTask);
  // userData[currentUser].board[0].boardlistTasks.push(newTask);
  await backend.setItem('users', JSON.stringify(userData));
  initTasks();
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
















