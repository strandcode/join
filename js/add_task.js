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

let taskPriority = 'medium';
let taskEpic = 'General';
let assignedToContacts = []; // Wenn keine Kontakte zugewiesen, dann soll er auch keine anzeigen
let taskCategory = 'To-Do'; // Das war früher die Boardlist, das wird jetzt als Category bezeichnet

let newTask = [];
// let TaskContactsAll;


//ANCHOR - ADD TO TASKLIST

async function addTaskToUser() {

  let newTask = {
    task_id: new Date().getTime().toString(),
    boardList: taskCategory,
    boardlistPosition: 0,
    title: taskTitle.value,
    description: taskDescription.value,
    epic: taskEpic,
    assign_to_contacts: assignedToContacts,
    date: taskDate.value,
    priority: taskPriority,
    isFound: false // Für die Suchfunktion im Board?
  };

  userData[currentUser].tasks.push(newTask);
  confirmTaskCreated(); // TODO Erst wenn formular durchgelaufen
  await saveToStorage();
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
    taskPriority = "urgent";
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
    taskPriority = "medium";
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
    taskPriority = "low";
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
  menuEpicHeader.value = categoryName;
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

    markAssignedTo(i, userData[currentUser].contacts[i].contactID);
  }
}

function markAssignedTo(index, contactID) {
  let markOption = document.getElementById('markContactID-' + index);
  contactID = contactID.toString();
  if (assignedToContacts.includes(contactID)) {
    markOption.classList.remove('d-none');
  } else {
    markOption.classList.add('d-none');
  }

}

function toggleMenuAssignedTo() {
  renderMenuAssignedToOptions();
  menuAssignedTo.classList.toggle('d-none');
}

function selectAssignedTo(index, contactID) {
  let markOption = document.getElementById('markContactID-' + index);

  if (assignedToContacts.includes(contactID)) {
    let c = assignedToContacts.indexOf(contactID);
    assignedToContacts.splice(c, 1);
    markOption.classList.add('d-none');
  } else {
    assignedToContacts.push(contactID);
    markOption.classList.remove('d-none');
  }


  showSelectedContacts();
}

function showSelectedContacts() {

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

  menuAssignedToHeader.value = '';
  if (firstNames.length == 0) {
    menuAssignedToHeader.value += `Select contact`;
  }
  if (firstNames.length == 1) {
    menuAssignedToHeader.value += `${firstNames[0]}`;
  }
  if (firstNames.length >= 2) {
    for (let i = 0; i < firstNames.length - 1; i++) {
      menuAssignedToHeader.value += `${firstNames[i]}, `;
    }
    menuAssignedToHeader.value += `${firstNames[firstNames.length - 1]}`;
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
  menuCategoryHeader.value = categoryName;
  taskCategory = categoryName;
}











