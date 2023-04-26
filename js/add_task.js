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
    clearFormValues();
    resetPriorityButtons();
  } else {
    console.warn('No tasks found');
  }
}

// NOTE New task form input fields
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDate = document.getElementById('taskDate');

const taskButtonUrgent = document.getElementById('taskButtonUrgent');
const taskButtonMedium = document.getElementById('taskButtonMedium');
const taskButtonLow = document.getElementById('taskButtonLow');
let taskButtonPriority = '';


let taskEpic = '';
let assignedToContacts = [];
let taskCategory = ''; // Das war früher die Boardlist, das wird jetzt als Category bezeichnet

let newTask = [];
// let TaskContactsAll;


//ANCHOR - ADD TO TASKLIST

async function addTaskToUser() {
  // const taskAssigned = document.getElementById('taskAssigned');
  // const assignTo = taskAssigned.value.split(' ');

  confirmTaskCreated(); // TODO Erst wenn formular durchgelaufen

  let newTask = {
    task_id: new Date().getTime(),
    boardList: taskCategory,
    boardlistPosition: 0,
    title: taskTitle.value,
    description: taskDescription.value,
    category: taskEpic,
    assign_to_contacts: assignedToContacts,
    date: taskDate.value,
    prio: taskButtonPriority,
    isFound: false
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


const menuEpic = document.getElementById('menuEpic');
const menuEpicHeader = document.getElementById('menuEpicHeader');

let epicOptions = ['Backend', 'Login', 'Summary', 'Contacts', 'Kanban-Board'];

function renderMenuEpicOptions() {
  menuEpic.innerHTML = '';
  for (let i = 0; i < epicOptions.length; i++) {
    menuEpic.innerHTML += /*html*/ `
      <div id="epicOption-${i}" class="option" onclick="selectEpic('${epicOptions[i]}')">${epicOptions[i]}</div>
    `;
  }
  // TODO menuCategory.innerHTML += /*html*/ `
  //   <div class="option">Add category</div>
  // `;
}

function toggleMenuEpic() {
  renderMenuEpicOptions();
  menuEpic.classList.toggle('d-none');
}

function selectEpic(categoryName) {
  toggleMenuEpic();
  menuEpicHeader.innerHTML = categoryName;
  taskEpic = categoryName;
}


// NOTE ######################  Menu Assigned To #############################

const menuAssignedTo = document.getElementById('menuAssignedTo');
const menuAsignedToHeader = document.getElementById('menuAsignedToHeader');


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
}

function toggleMenuAssignedTo() {
  renderMenuAssignedToOptions();
  menuAssignedTo.classList.toggle('d-none');
}

function selectAssignedTo(index, contactID) {

  if (assignedToContacts.includes(contactID)) {
    let c = assignedToContacts.indexOf(contactID);
    assignedToContacts.splice(c, 1);
  } else {
    assignedToContacts.push(contactID);
  }

  let markOption = document.getElementById('markContactID-' + index);
  markOption.classList.toggle('d-none');

  showSelectedContacts();

  // TODO taskCategory = categoryName;
}

function showSelectedContacts() {

  // TODO zurücksetzten bei mouseleave
  let firstNames = [];
  // Schleife durchlaufen, um contactID zu finden
  for (let i = 0; i < userData[currentUser].contacts.length; i++) {
    let contactID = userData[currentUser].contacts[i].contactID.toString();
    if (assignedToContacts.includes(contactID)) {
      let firstName = userData[currentUser].contacts[i].firstName;
      firstNames.push(firstName);
    }
  }
  console.log('Ausgewählte Kontakte: ' + firstNames);

  menuAssignedToHeader.innerHTML = '';
  if (firstNames.length == 0) {
    menuAssignedToHeader.innerHTML += `Select contact`;
  }
  if (firstNames.length == 1) {
    menuAssignedToHeader.innerHTML += `${firstNames[0]}`;
  }
  if (firstNames.length >= 2) {
    for (let i = 0; i < firstNames.length - 1; i++) {
      menuAssignedToHeader.innerHTML += `${firstNames[i]}, `;
    }
    menuAssignedToHeader.innerHTML += `${firstNames[firstNames.length - 1]}`;
  }
}


// NOTE ######################  Menu Category boardlist #############################

const menuCategory = document.getElementById('menuCategory');
const menuCategoryHeader = document.getElementById('menuCategoryHeader');

let categoryOptions = ['To-Do', 'In Progress', 'Reviews', 'Done'];

function renderMenuCategoryOptions() {
  menuCategory.innerHTML = '';
  for (let i = 0; i < categoryOptions.length; i++) {
    menuCategory.innerHTML += /*html*/ `
      <div id="categoryOption-${i}" class="option" onclick="selectCategory('${categoryOptions[i]}')">${categoryOptions[i]}</div>
    `;
  }
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











