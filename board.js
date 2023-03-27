let currentDraggedTask;

async function generateBoard() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  getCurrentUser();
  for (let i = 0; i < userData[currentUser].board.length; i++) {
    const boardCard = document.getElementById(`${i}`);
    boardCard.innerHTML = ``;
    for (let j = 0; j < userData[currentUser].tasks.length; j++) {
      let a = i.toString();
      if (userData[currentUser].tasks[j].boardList == a) {
        boardCard.innerHTML += generateBoardTemplate(i, j);
        priorityBoard2(j);
        categoryColor(j);
        await saveToBackend();
      }
    }
  }
}

function generateBoardTemplate(i, j) {
  /*  let assign = '';
   for (let k = 0; k < userData[currentUser].tasks[j]['assign_to_contacts'].length; k++) {
     let contactIndex = userData[currentUser].tasks[j]['assign_to_contacts'][k];
     let contact = userData[currentUser].contacts[contactIndex];
     if (userData[currentUser].contacts.length > 0) {
       assign += `
       <span class="avatar-bg-color-task" style="background-color: ${contact.avatar_bg_color}">
       ${contact.avatar_initials}
       </span>
       `;
     }
     else {
       assign += ``;
       console.warn('Keine Kontakte vorhanden');
     }
   } */
  return `    
    <div class="boardlist-card" ondragstart="startDragging(${userData[currentUser].tasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})" 
    id="${userData[currentUser].tasks[j]['task_id']}">
    <div class="work-category-D" id="workCategoryD${j}">
        ${userData[currentUser].tasks[j]['category']} 
      </div>
      <h5 id="workTaskHeadlineD" class="work-task-headline-D">${userData[currentUser].tasks[j]['title']}</h5>
      <span class="work-task-content-D" id="workTaskContentD">${userData[currentUser].tasks[j]['description']}</span>
      <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
      <div class="task-user-wrapper" id="taskUserWrapper">
      <div class="work-user-D" id="workUserD">
      <span class="avatar-bg-color-task" style="background-color: ${userData[currentUser].tasks[j]['assign_to_contacts'].bg_color}">
      ${userData[currentUser].tasks[j]['assign_to_contacts'].initials}
      </span>
     
        </div>
        <div class="urgency-image" id="urgencyImage">
        <img id="prioImg2${j}" src="" alt=""> 
        </div>
        </div>
        </div>
 `;
}
function openTask(i, j) {
  document.getElementById('popUpTaskD').classList.remove('d-none');
  document.getElementById('workTaskContainerD').classList.add('d-none');
  let popupContainer = document.getElementById('popUpTaskD');
  /*  let assign = '';
   for (let k = 0; k < userData[currentUser].tasks[j]['assign_to_contacts'].length; k++) {
     let contactIndex = userData[currentUser].tasks[j]['assign_to_contacts'][k];
     let contact = userData[currentUser].contacts[contactIndex];
     if (userData[currentUser].contacts.length > 0) {
       assign += `
       <span class="avatar-bg-color-task" style="background-color: ${contact.avatar_bg_color}">
       ${contact.avatar_initials} 
       </span>
       <span class="first-last-name">${contact.firstName} ${contact.lastName}</span>
       `;
     } */
  /*    else {
       assign += ``;
       console.warn('Keine Kontakte vorhanden');
     } */

  popupContainer.innerHTML = `
    <div class="work-category-D" id="workCategoryD">
      ${userData[currentUser].tasks[j]['category']} 
      <div class="close-work-overlay-D">
        <button onclick="closeWorkTask()">x</button>
      </div>
      <div class="close-work-overlay-mobile">
        <button onclick="closeWorkTask()"><img src="assets/img/arrow-left.svg" alt=""></button>
      </div>
    </div>

    <div class="work-overlay-headline-D">${userData[currentUser].tasks[j]['title']}</div>
    <span>${userData[currentUser].tasks[j]['description']}</span>
    <div class="work-overlay-date-D">
      <b>Due date:</b> <span class="overlay-date-D" id="overlayDateD">${userData[currentUser].tasks[j]['date']}</span>
    </div>
    <div class="priority-overlay-D">
      <b>Priority:</b><span class="prio-color" id="prioBoard"><img id="prioImg" src=""></span>
    </div>
    <div class="assigned-overlay-D">
      <b>Assigned To:</b>
      <div class="user-overlay-D">
      <span class="avatar-bg-color-task" style="background-color: ${userData[currentUser].tasks[j]['assign_to_contacts'].bg_color}">${userData[currentUser].tasks[j]['assign_to_contacts'].initials}
      
      </span>
      ${userData[currentUser].tasks[j]['assign_to_contacts'].firstname} ${userData[currentUser].tasks[j]['assign_to_contacts'].lastname}
      </div>
    </div>
    <div class="change-task-button">
      <button onclick="changeTask(${i}, ${j})">
        <img src="assets/img/summary-pencil.svg" alt="">
      </button>
    </div>
  `;
  priorityBoard(j);
}


function changeTask(i, j) {
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('changeTaskWrapper').classList.remove('d-none');
  let popUp2 = document.getElementById('changeTaskWrapper');

  popUp2.innerHTML = `
    
      <div class="left-taskfield-D">
      <div class="close-work-overlay-D">
      <button onclick="closeWorkTask()">x</button>
       </div>
       <div class="close-work-overlay-mobile">
         <button onclick="closeWorkTask()"><img src="assets/img/arrow-left.svg" alt=""></button>
      </div>
        <span>Title</span>
        <input required type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitleD${j}" 
        value="${userData[currentUser].tasks[j].title}">

        <span>Description</span>
        <textarea required class="width descript" name="Description" id="taskDescriptionD${j}"
        value="${userData[currentUser].tasks[j].description}"cols="30" rows="10"></textarea>

        <span>Due date</span>
        <input required class=" right-taskfield-input" type="date" placeholder="dd/mm/yyyy" name="" id="taskDateD${j}"
        value="${userData[currentUser].tasks[j].date}">
        <span>Prio</span>
        <div class="prio-button-wrapper">
          <button onclick="setPriorityUrgent()" id="taskButtonUrgentD" class="prio-button-urgent">Urgent<img
              src="assets/img/prio-urgent.svg"></button>
          <button onclick="setPriorityMedium()" id="taskButtonMediumD" class="prio-button-medium">Medium<img
              src="assets/img/prio-medium.svg"></button>
          <button onclick="setPriorityLow()" id="taskButtonLowD" class="prio-button-low">Low<img
              src="assets/img/prio-low.svg"></button>
        </div>

        <div class="right-taskfield-D">
          <span>Assigned to</span>
          <select class="assigned-change" placeholder="Select Contacts to assign" id="taskAssignedD${j}"> 
          <option value="" disabled selected>Select Contacts to assign</option>
          <option value="">${userData[currentUser].contacts[0].firstName} ${userData[currentUser].contacts[0].lastName}</option>
          </select></option>
       </select>
          <div class="button-container-D">
          <button onclick="confirmChangeTask(${i},${j})" class="button button-darkblue">Ok
            <img src="assets/img/icon-white-create.svg"></button>
      </div>
      </div>
    </div>
  </div>
  </div>
`;
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

//TODO - DRAG AND DROP /////////////////////////

function startDragging(task_id) {
  currentDraggedTask = task_id;
  // Weiß der handler welche ID er bewegt? Ja.
}

function dragover_handler(ev) {
  ev.preventDefault();

}

function drop_handler(category) {
  let dragged = userData[currentUser].tasks.find(index => index.task_id == currentDraggedTask);
  console.log(dragged);
  dragged.boardList = category;
  filterInProgress();
  filterToDO();
  filterFeedback();
  filterDone();
  saveToBackend();
  generateBoard();
}

function filterInProgress(i) {
  let inProgressTasks = userData[currentUser].tasks.filter(element => element.boardList == 1)

  let inProgress = document.getElementById(1);
  inProgress.innerHTML = '';
  for (let index = 0; index < inProgressTasks.length; index++) {
    let j = index;
    inProgress.innerHTML += `
    <div class="boardlist-card" ondragstart="startDragging(${inProgressTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})" 
    id="${inProgressTasks[j]['task_id']}">
  <div class="work-category-D">
      ${inProgressTasks[j]['category']} 
    </div>
    <h5 id="workTaskHeadlineD" class="work-task-headline-D">${inProgressTasks[j]['title']}</h5>
    <span class="work-task-content-D" id="workTaskContentD">${inProgressTasks[j]['description']}</span>
    <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
    <div class="task-user-wrapper" id="taskUserWrapper">
    <div class="work-user-D" id="workUserD">
      </div>
      <div class="urgency-image" id="urgencyImage">
      <img id="prioImg2${j}" src="" alt=""> 
      </div>
      </div>
    </div>`
  }
}

function filterToDO(i) {
  let toDoTasks = userData[currentUser].tasks.filter(element => element.boardList == 0)
  let toDO = document.getElementById(0);
  toDO.innerHTML = '';
  for (let index = 0; index < toDoTasks.length; index++) {
    let j = index;
    toDO.innerHTML += `
    <div class="boardlist-card" ondragstart="startDragging(${toDoTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})" 
    id="${toDoTasks[j]['task_id']}">
  <div class="work-category-D">
      ${toDoTasks[j]['category']} 
    </div>
    <h5 id="workTaskHeadlineD" class="work-task-headline-D">${toDoTasks[j]['title']}</h5>
    <span class="work-task-content-D" id="workTaskContentD">${toDoTasks[j]['description']}</span>
    <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
    <div class="task-user-wrapper" id="taskUserWrapper">
    <div class="work-user-D" id="workUserD">
      </div>
      <div class="urgency-image" id="urgencyImage">
      <img id="prioImg2${j}" src="" alt=""> 
      </div>
      </div>
    </div>`
  }
}
function filterFeedback(i) {
  let feedbackTasks = userData[currentUser].tasks.filter(element => element.boardList == 2)
  let feedback = document.getElementById(2);
  feedback.innerHTML = '';
  for (let index = 0; index < feedbackTasks.length; index++) {
    let j = index;
    feedback.innerHTML += `
    <div class="boardlist-card" ondragstart="startDragging(${feedbackTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})" 
    id="${feedbackTasks[j]['task_id']}">
  <div class="work-category-D">
      ${feedbackTasks[j]['category']} 
    </div>
    <h5 id="workTaskHeadlineD" class="work-task-headline-D">${feedbackTasks[j]['title']}</h5>
    <span class="work-task-content-D" id="workTaskContentD">${feedbackTasks[j]['description']}</span>
    <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
    <div class="task-user-wrapper" id="taskUserWrapper">
    <div class="work-user-D" id="workUserD">
      </div>
      <div class="urgency-image" id="urgencyImage">
      <img id="prioImg2${j}" src="" alt=""> 
      </div>
      </div>
      </div>`
  }
}
function filterDone(i) {
  let doneTasks = userData[currentUser].tasks.filter(element => element.boardList == 3)
  let done = document.getElementById(3);
  done.innerHTML = '';
  for (let index = 0; index < doneTasks.length; index++) {
    let j = index;
    done.innerHTML += `
    <div class="boardlist-card" ondragstart="startDragging(${doneTasks[j]['task_id']})" draggable="true" onclick="openTask(${i},${j})" 
    id="${doneTasks[j]['task_id']}}">
  <div class="work-category-D">
      ${doneTasks[j]['category']} 
    </div>
    <h5 id="workTaskHeadlineD" class="work-task-headline-D">${doneTasks[j]['title']}</h5>
    <span class="work-task-content-D" id="workTaskContentD">${doneTasks[j]['description']}</span>
    <span class="d-none"><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
    <div class="task-user-wrapper" id="taskUserWrapper">
    <div class="work-user-D" id="workUserD">
      </div>
      <div class="urgency-image" id="urgencyImage">
      <img id="prioImg2${j}" src="" alt=""> 
      </div>
      </div>
    </div>`
  }
}


//TODO - 
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


function filterTasks() {
  let search = document.getElementById('findTaskD').value.toLowerCase();
  let workTaskContainer = document.getElementById('workTaskContainerD');
  workTaskContainer.innerHTML = '';
  for (let i = 0; i < userData[currentUser].board.length; i++) {
    for (let j = 0; j < userData[currentUser].tasks.length; j++) {
      let task = userData[currentUser].tasks[j];
      let a = i.toString();
      if (task.boardList == a) {
        if (task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
          workTaskContainer.innerHTML += generateBoardTemplate(i, j);
        }
      }
    }
  }
}
//ANCHOR - IF Abfrage zur Prio

function priorityBoard(j) {
  let priority = userData[currentUser].tasks[j]['prio'];


  if (priority == 'urgent') {
    document.getElementById('prioImg').src = 'assets/img/priority-urgent.svg';
  }
  if (priority == 'medium') {
    document.getElementById('prioImg').src = 'assets/img/priority-medium.svg';
  }
  if (priority == 'low') {
    document.getElementById('prioImg').src = 'assets/img/priority-low.svg';
  }
}

function priorityBoard2(j) {
  let priority2 = userData[currentUser].tasks[j]['prio'];
  if (priority2 == 'urgent') {
    document.getElementById('prioImg2' + j).src = 'assets/img/prio-urgent.svg';
  } if (priority2 == 'medium') {
    document.getElementById('prioImg2' + j).src = 'assets/img/prio-medium.svg';
  } if (priority2 == 'low') {
    document.getElementById('prioImg2' + j).src = 'assets/img/prio-low.svg';
  }
}

//TODO - If abfrage zur generierung der Farben in der Kategorie
function categoryColor(j) {
  let labelColor = userData[currentUser].tasks[j]['category'];

  if (labelColor == 'Backoffice') {
    document.getElementById('workCategoryD' + j).classList.add('backoffice')
  }
  if (labelColor == 'Customer Service') {
    document.getElementById('workCategoryD' + j).classList.add('customer-service')
  }
  if (labelColor == 'Warhouse') {
    document.getElementById('workCategoryD' + j).classList.add('warhouse')
  }
}
