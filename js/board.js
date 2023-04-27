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
    }
  }
}

// TODO editTask einbauen
// TODO onclick="openTask('${userData[currentUser].tasks[j]['task_id']}')"

function generateBoardCard(i, j) {
  return /*html*/ `    
    <div class="boardlist-card" ondragstart="startDragging(${userData[currentUser].tasks[j]['task_id']})" draggable="true"
    id="${userData[currentUser].tasks[j]['task_id']}">
    
    <div class="card-top-wrapper">
      <div class="card-epic" id="workCategoryD${j}">
        ${userData[currentUser].tasks[j].epic}
      </div>
      <img src="assets/img/icons-cancel.svg" 
      onclick="deleteTask(${userData[currentUser].tasks[j].task_id})"
      alt="Close button" title="Delete task on click">
      </div>
      
      <h3 id="workTaskHeadlineD">${userData[currentUser].tasks[j]['title']}</h3>

      <p id="workTaskContentD">${userData[currentUser].tasks[j]['description']}</p>
      
      <!-- TODO Subtasks <span class=""><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span> -->
      
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
  console.log(typeof task_id);


  // Task finden

  let index;

  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].task_id == task_id) {
      index = i;
      console.log(index);
      break;
    }
  }


  // Task values in felder schreiben

  const editTaskTitle = document.getElementById('editTaskTitle');
  editTaskTitle.value = userData[currentUser].tasks[index].title;
  const editTaskDescription = document.getElementById('editTaskDescription');
  editTaskDescription.value = userData[currentUser].tasks[index].title;




}





function confirmChangeTask(i, j) {
  document.getElementById('changeTaskWrapper').classList.add('d-none')
  document.getElementById('workTaskContainerD').classList.remove('d-none');
  let changeTitle = document.getElementById(`taskTitleD${j}`);
  let changeDescription = document.getElementById(`taskDescriptionD${j}`);
  let changeDate = document.getElementById(`taskDateD${j}`);
  let changeAssignedTo = document.getElementById(`taskAssignedD${j}`);


  userData[currentUser].tasks[j].title = changeTitle.value;
  userData[currentUser].tasks[j].description = changeDescription.value;
  userData[currentUser].tasks[j].date = changeDate.value;
  userData[currentUser].tasks[j].assign_to_contacts = changeAssignedTo.value;
  saveToBackend();
  setTimeout(generateBoard, 500);
}

// TODO - DRAG AND DROP /////////////////////////


let currentDraggedTask;

function startDragging(task_id) {
  currentDraggedTask = task_id;
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


// function changeTask(i, j) {
//   document.getElementById('popUpTaskD').classList.add('d-none');
//   document.getElementById('changeTaskWrapper').classList.remove('d-none');
//   let popUp2 = document.getElementById('changeTaskWrapper');

//   popUp2.innerHTML = `
    
//       <div class="left-taskfield-D">
//       <div class="close-work-overlay-D">
//       <button onclick="closeWorkTask()">x</button>
//        </div>
//        <div class="close-work-overlay-mobile">
//          <button onclick="closeWorkTask()"><img src="assets/img/arrow-left.svg" alt=""></button>
//       </div>
//         <span>Title</span>
//         <input required type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitleD${j}" 
//         value="${userData[currentUser].tasks[j].title}">

//         <span>Description</span>
//         <textarea required class="width descript" name="Description" id="taskDescriptionD${j}"
//         value="${userData[currentUser].tasks[j].description}"cols="30" rows="10"></textarea>

//         <span>Due date</span>
//         <input required class=" right-taskfield-input" type="date" placeholder="dd/mm/yyyy" name="" id="taskDateD${j}"
//         value="${userData[currentUser].tasks[j].date}">
//         <span>Prio</span>
//         <div class="prio-button-wrapper">
//           <button onclick="setPriorityUrgent()" id="taskButtonUrgent" class="prio-button-urgent">Urgent<img
//               src="assets/img/prio-urgent.svg"></button>
//           <button onclick="setPriorityMedium()" id="taskButtonMedium" class="prio-button-medium">Medium<img
//               src="assets/img/prio-medium.svg"></button>
//           <button onclick="setPriorityLow()" id="taskButtonLow" class="prio-button-low">Low<img
//               src="assets/img/prio-low.svg"></button>
//         </div>

//         <div class="right-taskfield-D">
//           <span>Assigned to</span>
//           <select class="assigned-change" placeholder="Select Contacts to assign" id="taskAssignedD${j}"> 
//           <option value="" disabled selected>Select Contacts to assign</option>
//           <option value="">${userData[currentUser].contacts[0].firstName} ${userData[currentUser].contacts[0].lastName}</option>
//           </select></option>
//        </select>
//           <div class="button-container-D">
//           <button onclick="confirmChangeTask(${i},${j})" class="button button-darkblue">Ok
//             <img src="assets/img/icon-white-create.svg"></button>
//       </div>
//       </div>
//     </div>
//   </div>
//   </div>
// `;
// }

// filterInProgress();
// filterToDO();
// filterFeedback();
// filterDone();
// saveToBackend();

// function filterInProgress(i) {
//   let inProgressTasks = userData[currentUser].tasks.filter(element => element.boardList == 1)

//   let inProgress = document.getElementById(1);
//   inProgress.innerHTML = '';
//   for (let index = 0; index < inProgressTasks.length; index++) {
//     let j = index;
//     inProgress.innerHTML += `
//     <div class="boardlist-card" ondragstart="startDragging(${inProgressTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})"
//     id="${inProgressTasks[j]['task_id']}">
//   <div class="work-category-D">
//       ${inProgressTasks[j]['category']}
//     </div>
//     <h5 id="workTaskHeadlineD" class="work-task-headline-D">${inProgressTasks[j]['title']}</h5>
//     <span class="work-task-content-D" id="workTaskContentD">${inProgressTasks[j]['description']}</span>
//     <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
//     <div class="task-user-wrapper" id="taskUserWrapper">
//     <div class="work-user-D" id="workUserD">
//       </div>
//       <div class="urgency-image" id="urgencyImage">
//       <img id="prioImg2${j}" src="" alt="">
//       </div>
//       </div>
//     </div>`
//   }
// }

// function filterToDO(i) {
//   let toDoTasks = userData[currentUser].tasks.filter(element => element.boardList == 0)
//   let toDO = document.getElementById(0);
//   toDO.innerHTML = '';
//   for (let index = 0; index < toDoTasks.length; index++) {
//     let j = index;
//     toDO.innerHTML += `
//     <div class="boardlist-card" ondragstart="startDragging(${toDoTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})"
//     id="${toDoTasks[j]['task_id']}">
//   <div class="work-category-D">
//       ${toDoTasks[j]['category']}
//     </div>
//     <h5 id="workTaskHeadlineD" class="work-task-headline-D">${toDoTasks[j]['title']}</h5>
//     <span class="work-task-content-D" id="workTaskContentD">${toDoTasks[j]['description']}</span>
//     <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
//     <div class="task-user-wrapper" id="taskUserWrapper">
//     <div class="work-user-D" id="workUserD">
//       </div>
//       <div class="urgency-image" id="urgencyImage">
//       <img id="prioImg2${j}" src="" alt="">
//       </div>
//       </div>
//     </div>`
//   }
// }
// function filterFeedback(i) {
//   let feedbackTasks = userData[currentUser].tasks.filter(element => element.boardList == 2)
//   let feedback = document.getElementById(2);
//   feedback.innerHTML = '';
//   for (let index = 0; index < feedbackTasks.length; index++) {
//     let j = index;
//     feedback.innerHTML += `
//     <div class="boardlist-card" ondragstart="startDragging(${feedbackTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})"
//     id="${feedbackTasks[j]['task_id']}">
//   <div class="work-category-D">
//       ${feedbackTasks[j]['category']}
//     </div>
//     <h5 id="workTaskHeadlineD" class="work-task-headline-D">${feedbackTasks[j]['title']}</h5>
//     <span class="work-task-content-D" id="workTaskContentD">${feedbackTasks[j]['description']}</span>
//     <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
//     <div class="task-user-wrapper" id="taskUserWrapper">
//     <div class="work-user-D" id="workUserD">
//       </div>
//       <div class="urgency-image" id="urgencyImage">
//       <img id="prioImg2${j}" src="" alt="">
//       </div>
//       </div>
//       </div>`
//   }
// }
// function filterDone(i) {
//   let doneTasks = userData[currentUser].tasks.filter(element => element.boardList == 3)
//   let done = document.getElementById(3);
//   done.innerHTML = '';
//   for (let index = 0; index < doneTasks.length; index++) {
//     let j = index;
//     done.innerHTML += `
//     <div class="boardlist-card" ondragstart="startDragging(${doneTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})"
//     id="${doneTasks[j]['task_id']}}">
//   <div class="work-category-D">
//       ${doneTasks[j]['category']}
//     </div>
//     <h5 id="workTaskHeadlineD" class="work-task-headline-D">${doneTasks[j]['title']}</h5>
//     <span class="work-task-content-D" id="workTaskContentD">${doneTasks[j]['description']}</span>
//     <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
//     <div class="task-user-wrapper" id="taskUserWrapper">
//     <div class="work-user-D" id="workUserD">
//       </div>
//       <div class="urgency-image" id="urgencyImage">
//       <img id="prioImg2${j}" src="" alt="">
//       </div>
//       </div>
//     </div>`
//   }
// }



/* function slideInAddTask(i, j) {
  document.getElementById('slideInAddTaskWrapper').classList.remove('d-none')

  document.getElementById('slideInAddTaskWrapper').innerHTML = `
  <div class="slide-in-add-task desktop-slide-in" id="slideInAddTask">
  <div class="left-taskfield-J">
    <h1>Add Task</h1>
    <select required="" class="width board-list-left" name="Select Contacts to assign" placeholder="Select Board List" id="taskBoardList">
      <option disabled selected hidden>Select board list</option>
      <option value="0">To do</option>
      <option value="1">In Progress</option>
      <option value="2">Awaiting Feedback</option>
      <option value="3">Done</option>
    </select>
    <span>Title</span>
    <input required="" type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitle">

    <span>Description</span>
    <textarea required="" class="width descript" placeholder="Enter a Description" name="Description" id="taskDescription" cols="30" rows="10"></textarea>
    <span>Category</span>
    <select name="Category" class="category-add" placeholder="Category" id="taskCategory">
      <option aria-placeholder="" disabled="" selected="" hidden="">Category</option>
      <option value="Backoffice">Backoffice</option>
      <option value="Customer Service">Customer Service</option>
      <option value="Warhouse">Warehouse</option>
    </select>
  </div>
  <div class="right-taskfield-J">
  <span>Assigned to</span>
  <select class="assigned-change" placeholder="Select Contacts to assign" id="taskAssignedD">
  <option value="" disabled selected>Select Contacts to assign</option>
    <option value="${userData[currentUser].contacts[0].firstName} ${userData[currentUser].contacts[0].lastName}">${userData[currentUser].contacts[0].firstName} ${userData[currentUser].contacts[0].lastName}</option>
  </select>
    <span>Due date</span>
    <input required="" class=" right-taskfield-input-date" type="date" placeholder="dd/mm/yyyy" name="" id="taskDate">
    <span>Prio</span>
    <div class="prio-button-wrapper">
      <button onclick="setPriorityUrgent()" id="taskButtonUrgent" class="prio-button-urgent active">Urgent<img src="assets/img/prio-urgent.svg"></button>
      <button onclick="setPriorityMedium()" id="taskButtonMedium" class="prio-button-medium active">
      Medium<img src="assets/img/prio-medium.svg"></button>
      <button onclick="setPriorityLow()" id="taskButtonLow" class="prio-button-low">Low<img src="assets/img/prio-low.svg"></button>
    </div>
    <div class="button-container-J">
      <button onclick="cancelButton()" class="button button-white mobile-Button-J">Cancel<img src="assets/img/icon-black-clear.svg"></button>
      <button onclick="addTaskToUser();createTask()" class="button button-darkblue">Create Task
        <img src="assets/img/icon-white-create.svg"></button>
    </div>
  </div>
</div>`;
} */







// function priorityBoard(j) {
//   let priority = userData[currentUser].tasks[j]['prio'];


//   if (priority == 'urgent') {
//     document.getElementById('prioImg').src = 'assets/img/priority-urgent.svg';
//   }
//   if (priority == 'medium') {
//     document.getElementById('prioImg').src = 'assets/img/priority-medium.svg';
//   }
//   if (priority == 'low') {
//     document.getElementById('prioImg').src = 'assets/img/priority-low.svg';
//   }
// }

// function priorityBoard2(j) {
//   let priority2 = userData[currentUser].tasks[j]['prio'];
//   if (priority2 == 'urgent') {
//     document.getElementById('prioImg2' + j).src = 'assets/img/prio-urgent.svg';
//   } if (priority2 == 'medium') {
//     document.getElementById('prioImg2' + j).src = 'assets/img/prio-medium.svg';
//   } if (priority2 == 'low') {
//     document.getElementById('prioImg2' + j).src = 'assets/img/prio-low.svg';
//   }
// }

// /- If abfrage zur generierung der Farben in der Kategorie
// function categoryColor(j) {
//   let labelColor = userData[currentUser].tasks[j]['category'];

//   if (labelColor == 'Backoffice') {
//     document.getElementById('workCategoryD' + j).classList.add('backoffice')
//   }
//   if (labelColor == 'Customer Service') {
//     document.getElementById('workCategoryD' + j).classList.add('customer-service')
//   }
//   if (labelColor == 'Warhouse') {
//     document.getElementById('workCategoryD' + j).classList.add('warhouse')
//   }
// }
