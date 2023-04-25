async function initTasks() {
  try {
    userData = JSON.parse(await getItem('userData'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  initHeader();
  initNavbar();
  initTasksData();
}


function initTasksData() {
  setNavbarItemActive('.navbar-task');
  if (userData[currentUser].board) {
    generateBoardListDropdown();
    clearFormValues();
    resetPriorityButtons();
  } else {
    console.warn('No tasks found');
  }
}

// NOTE New task form input fields
const taskBoardList = document.getElementById('taskBoardList');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDate = document.getElementById('taskDate');
const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');

let taskButtonPriority = '';
let taskCategory = '';
let newTask = [];
// let TaskContactsAll;


function generateBoardListDropdown() {
  taskBoardList.innerHTML = ``;
  taskBoardList.innerHTML += `
    <option disabled selected hidden>Select board list</option>
    <option value="0">${userData[currentUser].board[0].boardlistTitle}</option>
    <option value="1">${userData[currentUser].board[1].boardlistTitle}</option>
    <option value="2">${userData[currentUser].board[2].boardlistTitle}</option>
    <option value="3">${userData[currentUser].board[3].boardlistTitle}</option>
  `;
}


//ANCHOR - ADD TO TASKLIST

async function addTaskToUser() {
  // const taskAssigned = document.getElementById('taskAssigned');
  // const assignTo = taskAssigned.value.split(' ');
  if (taskBoardList.value == 'Select board list') {
    taskBoardList.value = 0;
  }
  confirmTaskCreated();

  let newTask = {
    task_id: new Date().getTime(),
    boardList: parseInt(taskBoardList.value),
    boardlistPosition: 0,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskCategory,
    assign_to_contacts: {
      firstname: assignTo[0],
      lastname: assignTo[1],
      initials: assignTo[2],
      bg_color: assignTo[3]
    },
    date: taskDate.value,
    prio: taskButtonPriority,
  };
  userData[currentUser].tasks.push(newTask);
  saveToStorage();
  initTasks();
}

function confirmTaskCreated() {
  const btnCreateTask = document.getElementById('btnCreateTask');

  btnCreateTask.disabled = true;
  btnCreateTask.innerHTML = `
  Task Created
  <img src="assets/img/icon-white-create.svg">
  `;

  setTimeout(() => {
    btnCreateTask.disabled = false;
    btnCreateTask.innerHTML = `
    Task Created
    `;
  }, 1000);
}







function setPriorityUrgent() {
  resetPriorityButtons()
  let taskButtonUrgent = document.getElementById('taskButtonUrgent');
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
  resetPriorityButtons()
  let taskButtonMedium = document.getElementById('taskButtonMedium');
  if (!taskButtonMedium.classList.contains('active')) {
    taskButtonMedium.style.backgroundColor = "orange";
    taskButtonMedium.classList.add("active");
    taskButtonPriority = "medium";
  } else {
    taskButtonMedium.style.backgroundColor = "";
    taskButtonMedium.classList.remove("active");
    taskButtonPriority = '';
  }
}

function setPriorityLow() {
  resetPriorityButtons()
  let taskButtonLow = document.getElementById('taskButtonLow');
  if (!taskButtonLow.classList.contains('active')) {
    taskButtonLow.style.backgroundColor = "green";
    taskButtonLow.classList.add("active");
    taskButtonPriority = "low";
  } else {
    taskButtonLow.style.backgroundColor = "";
    taskButtonLow.classList.remove("active");
    taskButtonPriority = '';
  }
}




function resetPriorityButtons() {
  let taskButtonPriorityElements = document.querySelectorAll('.prio-button-low, .prio-button-medium, .prio-button-urgent');
  taskButtonPriorityElements.forEach(element => {
    element.style.backgroundColor = "";
    element.classList.remove("active");
    element.value = '';
  });
  taskButtonPriority = '';
}

function clearFormValues() {
  taskBoardList.value = '';
  taskTitle.value = '';
  taskDescription.value = '';
  taskDate.value = '';
}

//ANCHOR - USER INFORMATION "ADD TASK TO BOARD"
// function taskCreateImageUp() {
//   const taskCreateImg = document.getElementById("taskCreate");
//   taskCreateImg.style.opacity = "1";
//   let pos = 0;
//   const id = setInterval(frame, 3);
//   function frame() {
//     if (pos == 20) {
//       clearInterval(id);
//       setTimeout(function () {
//         taskCreateImg.style.opacity = "0";
//       }, 2000);
//     } else {
//       pos++;
//       taskCreateImg.style.bottom = pos + "%";
//       if (pos >= 1) {
//         taskCreateImg.style.transition = "bottom 0.5s ease-in-out";
//       }
//     }
//   }
// }


const menuCategory = document.getElementById('menuCategory');
const menuCategoryHeader = document.getElementById('menuCategoryHeader');

let categoryOptions = ['Backend', 'Login', 'Summary', 'Contacts', 'Board'];

function renderMenuCategoryOptions() {
  menuCategory.innerHTML = '';
  for (let i = 0; i < categoryOptions.length; i++) {
    menuCategory.innerHTML += /*html*/ `
      <div id="categoryOption-${i}" class="option" onclick="selectCategory('${categoryOptions[i]}')">${categoryOptions[i]}</div>
    `;
  }
  // TODO menuCategory.innerHTML += /*html*/ `
  //   <div class="option">Add category</div>
  // `;
}

function toggleMenuCategory() {
  renderMenuCategoryOptions();
  menuCategory.classList.toggle('d-none');
}

function selectCategory(categoryName) {
  toggleMenuCategory();
  menuCategoryHeader.innerHTML = categoryName;
  taskCategory = categoryName;
}


// NOTE ######################  Menu Assigned To #############################

const menuAssignedTo = document.getElementById('menuAssignedTo');
const menuAsignedToHeader = document.getElementById('menuAsignedToHeader');
let assignedToContacts = [];

function renderMenuAssignedToOptions() {
  menuAssignedTo.innerHTML = '';
  for (let i = 0; i < userData[currentUser].contacts.length; i++) {
    menuAssignedTo.innerHTML += /*html*/ `
      <div id="contactOption-${i}" class="option assignedContactActive" 
        onclick="selectAssignedTo('${i}', '${userData[currentUser].contacts[i].contactID}')">
        <img id="markContactID-${i}" class="d-none" src="assets/img/arrow-51-64.png" alt="">
        <span>
          ${userData[currentUser].contacts[i].firstName}
          ${userData[currentUser].contacts[i].lastName}
        </span>
      </div>
    `;


  }
  // TODO menuCategory.innerHTML += /*html*/ `
  //   <div class="option">Add category</div>
  // `;
}

function toggleMenuAssignedTo() {
  renderMenuAssignedToOptions();
  menuAssignedTo.classList.toggle('d-none');
}

function selectAssignedTo(index, contactID) {
  assignedToContacts.push(contactID);
  // toggleMenuAssignedTo();

  let markOption = document.getElementById('markContactID-' + index);
  console.log(markOption);
  markOption.classList.toggle('d-none');


  menuAssignedToHeader.innerHTML = 'Assigned to ';
  // TODO taskCategory = categoryName;
}











