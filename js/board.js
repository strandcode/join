async function initBoard() {
  initHeader();
  initNavbar();
  setNavbarItemActive('.navbar-board');
  try {
    userData = JSON.parse(await getItem('userData'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  initBoardData();
}

function initBoardData() {
  generateBoardListBody();
}

function generateBoardListBody() {
  if (userData[currentUser].board.length > 0) {

    for (let i = 0; i < userData[currentUser].board.length; i++) {

      const boardListBody = document.getElementById(`boardListBody-${i}`);
      boardListBody.innerHTML = '';
      for (let j = 0; j < userData[currentUser].tasks.length; j++) {

        if (userData[currentUser].tasks[j].boardList == categoryOptions[i]) {
          boardListBody.innerHTML += generateBoardCard(i, j);
          setCardPriority(j);
          setAssignedContacts(j);
        }
      }
      boardListBody.innerHTML += /*html*/ `
      <div class="drop-here">Drop here</div>
      `;
    }
  }
}


function generateBoardCard(i, j) {
  return /*html*/ `    
    <div class="boardlist-card" ondragstart="startDragging(${userData[currentUser].tasks[j]['task_id']})" draggable="true"
    id="${userData[currentUser].tasks[j]['task_id']}" onclick="openTask('${userData[currentUser].tasks[j]['task_id']}')">
    
    <div class="card-top-wrapper">
      <div class="card-epic" id="workCategoryD${j}">
        ${userData[currentUser].tasks[j].epic}
      </div>
      <!-- <img src="assets/img/icons-cancel.svg" 
      onclick="deleteTask(${userData[currentUser].tasks[j].task_id})"
      alt="Close button" title="Delete task on click"> -->
      </div>
      
      <h3 id="workTaskHeadlineD">${userData[currentUser].tasks[j]['title']}</h3>

      <p id="workTaskContentD">${userData[currentUser].tasks[j]['description']}</p>
      
         
      <div class="responsible-wrapper">
        <div id="taskResponsibles-${j}" class="responsibles"></div>
        <img id="cardPriority-${j}" src="" alt="">
      </div>
    </div>
  `;
}

function setAssignedContacts(j) {
  let taskResponsibles = document.getElementById('taskResponsibles-' + j);
  taskResponsibles.innerHTML = '';
  let assignedIDs = userData[currentUser].tasks[j].assign_to_contacts;

  for (let a = 0; a < assignedIDs.length; a++) {

    for (let i = 0; i < userData[currentUser].contacts.length; i++) {
      let contactID = userData[currentUser].contacts[i].contactID.toString();
      if (contactID === assignedIDs[a]) {
        taskResponsibles.innerHTML += renderTaskResponsible(i);
      }
    }
  }
}

function renderTaskResponsible(i) {
  return /*html*/ `
    <div class="avatar" style="background-color: ${userData[currentUser].contacts[i].avatar_bg_color}">
      <div class="avatar-initials">
            ${userData[currentUser].contacts[i].avatar_initials}
      </div>
    </div>
  `;
}


function setCardPriority(j) {
  let priority = userData[currentUser].tasks[j].priority;
  if (priority == 'urgent') {
    document.getElementById('cardPriority-' + j).src = 'assets/img/prio-urgent.svg';
  } if (priority == 'medium') {
    document.getElementById('cardPriority-' + j).src = 'assets/img/prio-medium.svg';
  } if (priority == 'low') {
    document.getElementById('cardPriority-' + j).src = 'assets/img/prio-low.svg';
  }
}

async function deleteTask(task_id) {
  console.log('Löschen der Task:', task_id);

  let index;

  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].task_id == task_id) {
      index = i;
      console.log(index);
      break;
    }
  }
  userData[currentUser].tasks.splice(index, 1);
  await saveToStorage();
  initBoard();

}

// TODO Edit Task /////////////////////////


function showOverlay(overlayId, overlayContainerId) {
  document.getElementById(overlayId).classList.remove('d-none');
  document.getElementById(overlayId).classList.add('fade-to-gray-overlay');
  document.getElementById(overlayContainerId).classList.add('desktop-slide-in');
}

function closeOverlay(overlayId, overlayContainerId) {
  document.getElementById(overlayContainerId).classList.remove('desktop-slide-in');
  document.getElementById(overlayContainerId).classList.add('desktop-slide-out');
  document.getElementById(overlayId).classList.add('fade-out-gray-overlay');
  setTimeout(function () {
    document.getElementById(overlayId).classList.add('d-none');
    document.getElementById(overlayId).classList.remove('fade-to-gray-overlay', 'fade-out-gray-overlay');
    document.getElementById(overlayContainerId).classList.remove('desktop-slide-out');
  }, 240);
}

// TODO Edit Task /////////////////////////

function openTask(task_id) {
  showOverlay('editTaskOverlay', 'editTaskContainer');
  console.log(task_id);


  // Task finden

  let index;

  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].task_id == task_id) {
      index = i;
      console.log(index);
      break;
    }
  }


  // NOTE Task values in Felder schreiben

  const editTaskTitle = document.getElementById('editTaskTitle');
  editTaskTitle.value = userData[currentUser].tasks[index].title;

  const editTaskDescription = document.getElementById('editTaskDescription');
  editTaskDescription.value = userData[currentUser].tasks[index].description;


  const taskDate = document.getElementById('editTaskDate');
  taskDate.value = userData[currentUser].tasks[index].date;


  const editEpicHeader = document.getElementById('menuEpicHeader');
  editEpicHeader.value = userData[currentUser].tasks[index].epic;

  const editAssignedToHeader = document.getElementById('menuAssignedToHeader');

  let assignedContacts = getAssignedContacts(index, task_id);
  editAssignedToHeader.value = assignedContacts;



  const editCategoryHeader = document.getElementById('menuCategoryHeader');
  editCategoryHeader.value = userData[currentUser].tasks[index].boardList;

  const editTaskButtons = document.getElementById('editTaskButtons');
  editTaskButtons.innerHTML = '';
  editTaskButtons.innerHTML = /*html*/ `
    <button id="btnDeleteTask" onclick="deleteTask(${task_id}); closeOverlay('editTaskOverlay', 'editTaskContainer');" class="button button-white">Delete Task
    </button>
    <button id="btnSaveTask" onclick="saveEditedTask(${index})" class="button button-darkblue">Save Task
    </button>
  `;
  renderTaskPriorityButtons(index);

}



function getAssignedContacts(index, task_id) {
  let contactIDs = userData[currentUser].tasks[index].assign_to_contacts;
  let names = [];

  for (let i = 0; i < contactIDs.length; i++) { // Iteration durch contactIDs
    for (let j = 0; j < userData[currentUser].contacts.length; j++) {
      if (userData[currentUser].contacts[j].contactID == contactIDs[i]) {
        let name = userData[currentUser].contacts[j].firstName;
        names.push(name);
      }
    }
  }
  let nameString = names.join(' ');
  return nameString;
}

function renderTaskPriorityButtons(index) {
  const prioButtonWrapper = document.getElementById('prioButtonWrapper');
  prioButtonWrapper.innerHTML = '';
  prioButtonWrapper.innerHTML += /*html*/ `
    <button onclick="setPriorityTo(${index}, 'urgent');" 
      id="editTaskButtonUrgent" class="prio-button-urgent">Urgent
      <img src="assets/img/prio-urgent.svg">
    </button>
    <button onclick="setPriorityTo(${index}, 'medium');" 
    id="editTaskButtonMedium" class="prio-button-medium">Medium
      <img src="assets/img/prio-medium.svg">
    </button>
    <button onclick="setPriorityTo(${index}, 'low');" 
    id="editTaskButtonLow" class="prio-button-low">Low
      <img src="assets/img/prio-low.svg">
    </button>
  `;

  renderTaskPriority(index);
}





function renderTaskPriority(index) {
  const taskPriority = userData[currentUser].tasks[index].priority;
  const btnUrgent = document.getElementById('editTaskButtonUrgent');
  const btnMedium = document.getElementById('editTaskButtonMedium');
  const btnLow = document.getElementById('editTaskButtonLow');

  btnUrgent.classList.remove('active', 'bg-urgent');
  btnMedium.classList.remove('active', 'bg-medium');
  btnLow.classList.remove('active', 'bg-low');

  if (taskPriority == 'urgent') {
    btnUrgent.classList.add('active', 'bg-urgent');
  }
  if (taskPriority == 'medium') {
    btnMedium.classList.add('active', 'bg-medium');
  }
  if (taskPriority == 'low') {
    btnLow.classList.add('active', 'bg-low');
  }

}

async function setPriorityTo(index, newPriority) {
  userData[currentUser].tasks[index].priority = newPriority;
  renderTaskPriorityButtons(index);
  await saveToStorage();
}

async function saveEditedTask(index) {

  const currentTask = userData[currentUser].tasks[index];
  currentTask.title = editTaskTitle.value;
  currentTask.description = editTaskDescription.value;

  currentTask.date = editTaskDate.value;
  currentTask.boardList = menuCategoryHeader.value;
  currentTask.epic = menuEpicHeader.value;

  currentTask.assign_to_contacts = assignedToContacts;


  await saveToStorage();
  closeOverlay('editTaskOverlay', 'editTaskContainer');
  initBoard();
}




// DRAG AND DROP /////////////////////////


let currentDraggedTask;

function startDragging(task_id) {
  currentDraggedTask = task_id;
  showDropZones();
}

function dragover_handler(ev) {
  ev.preventDefault();
}



function drop_handler(category) {
  console.log('Category', category);
  let dragged = userData[currentUser].tasks.find(index => index.task_id == currentDraggedTask);
  console.log(dragged);
  dragged.boardList = category;
  console.log(dragged.boardList);
  console.log(typeof dragged.boardList);
  console.log(dragged.task_id);

  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].task_id == dragged.task_id) {
      userData[currentUser].tasks[i].boardList = dragged.boardList;
      console.log(userData[currentUser].tasks[i]);
      saveToStorage();
      // let c = assignedToContacts.indexOf(contactID);
      // assignedToContacts.splice(c, 1);
    }
  }
  // initBoard();
  setTimeout(initBoard, 250);
}

function cancelButton() {
  document.getElementById('slideInAddTaskWrapper').classList.add('d-none')
  document.getElementById('slideInAddTask').classList.add('d-none')
}

function closeWorkTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('workTaskContainerD').classList.remove('d-none');
  document.getElementById('changeTaskWrapper').classList.add('d-none');
}
function createTask() {
  document.getElementById('slideInAddTaskWrapper').classList.add('d-none')
  document.getElementById('slideInAddTask').classList.add('d-none')
}


function showDropZones() {
  let dropZones = document.getElementsByClassName('drop-here');
  for (let i = 0; i < dropZones.length; i++) {
    dropZones[i].classList.add('drop-zone-waver');
  }
}

// TODO Search function

function filterTasks() {
  let searchText = document.getElementById('searchText').value;
  if (searchText.trim() === '') {
    initBoard();
  }

  searchText = searchText.toLowerCase();
  console.log(searchText);


  let boardBody = document.getElementById('boardBody');
  boardBody.innerHTML = 'Suchergebnis';


  // for (let j = 0; j < userData[currentUser].tasks.length; j++) {
  //   let task = userData[currentUser].tasks[j];
  //   if (task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)) {
  //     console.log('Aufgabe Index: ', j);
  //     boardBody.innerHTML += generateBoardCard(0, j);
  //   }
  // }
}

