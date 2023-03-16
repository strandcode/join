//let priority = ["assets/img/prio-low.svg", "assets/img/prio-medium.svg", "assets/img/prio-urgent.svg"];
// let board = [];

//  NOTE  STRUKTUR DES ARRAYS   --->  Durch iterieren  ---->    

//  userData[currentUser].board[0]boardlistTasks[0{TASK}]
let boardCategory = ['workStepsTodo', 'workStepsProgress', 'workStepsFeedback', 'workStepsDone'];


async function generateBoard() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  getCurrentUser()
  const boardList = userData[currentUser].board;
  let card = document.getElementById('workStepsTodo');
  for (let i = 0; i < boardList.length; i++) {
    card = document.getElementById(boardCategory[i]);
    for (let j = 0; j < boardList[i].boardlistTasks.length; j++) {
      //card.innerHTML = '';
      const task = boardList[i].boardlistTasks[j];
      card.innerHTML += generateBoardTemplate(i, j, task)
    }
  }
}

function generateBoardTemplate(i, j, task) {
  const boardList = userData[currentUser].board;
  return `    
  <div class="work-task-category-D" id="workSteps${i}">
      <h4>${boardList[i].boardlistTitle}</h4> 
      <button id="smallPlusD" class="small-plus-D" onclick="slideInAddTask()"><img
      src="assets/img/icon-add-plus-dark.svg" alt="">
      </button>
      </div>
      <div onclick="openTask(${i}, ${j})" class="work-task-D" draggable="true" id="work-task-D-${i}">
    <div class="delete-task-D" onclick="deleteTask(${j})">
    <div class="work-category-D ${task['category']}">
    ${task['category']}</div>
    <button> X </button></div>
    <div class="work-task-headline-D">${task['title']}</div>
    <div class="work-task-content-D">${task['description']}</div>
    <span><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span> 
    <div class="work-user-D">
    <div class="work-task-user-D ${task['assigned_to']}"> 
    <span>${task['avatar_initials']}</span>
      <div class="task-contact-3"></div>
    </div>
    <div class="urgency-D" id="urgencyD">
        <img src="assets/img/prio-low.svg" alt="">
    </div>
    </div>
  </div>
  </div>
`;
}

function openTask(i, j) {
  const task = userData[currentUser].board[i].boardlistTasks[j];
  document.getElementById('popUpTaskD').classList.remove('d-none');
  document.getElementById('workTaskContainerD').classList.add('d-none');
  let popupContainer = document.getElementById('popUpTaskD');
  popupContainer.innerHTML = `
    <div class="work-category-D" id="taskCategoryOverlayD">
      ${task['category']} 
    </div>
    <div class="close-work-overlay-D">
      <button onclick="closeWorkTask()">x</button>
    </div>
    <div class="work-overlay-headline-D">${task['title']}</div>
    <span>${task['description']}</span>
    <div class="work-overlay-date-D">
      <b>Due date:</b> <span class="overlay-date-D" id="overlayDateD">${task['date']}</span>
    </div>
    <div class="priority-overlay-D">
      <b>Priority:</b><span>${task['prio']}</span><img src="assets/img/priority-urgent.svg" alt="">
    </div>
    <div class="assigned-overlay-D">
      <b>Assigned To:</b>
      <div class="user-overlay-D">
        <span class="assigned-contact">
        <span>${task['avatar_bg_color']}</span>
        <span>${task['avatar_initials']}</span>
        <span>${task['assigned_to']}</span>
        </span>
        </div>
      </div>
      <div class="pop-up-change-button">
        <button onclick="changeTask(${i}, ${j})">
          <img src="assets/img/summary-pencil.svg" alt="">
        </button>
      </div>
    </div>
  `;
}

function changeTask() {
  let popUp2 = document.getElementById('popUpTaskD');
  popUp2.innerHTML = "";
  popUp2.innerHTML = `
    <div class="left-taskfield-J">
      <h1>Add Task</h1>
      <select required="" class="width" name="Select Contacts to assign" placeholder="Select Board List" id="taskBoardList">
  <option disabled="" selected="" hidden="">Select board list</option>
        <option value="0">To do</option>
        <option value="1">In progress</option>
        <option value="2">Awaiting Feedback</option>
        <option value="3">Done</option>
  </select>
      <span>Title</span>
      <input required="" type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitle">
      <span>Description</span>
      <textarea required="" class="width" placeholder="Enter a Description" name="Description" id="taskDescription" cols="30" rows="10"></textarea>
      <span>Category</span>
      <select name="Category" placeholder="Category" id="taskCategory">
        <option aria-placeholder="" disabled="" selected="" hidden="">Category</option>
        <option value="Backoffice">Backoffice</option>
        <option value="Customer Service">Customer Service</option>
        <option value="Warhouse">Warehouse</option>
      </select>
    </div>
    <div class="right-taskfield-J">
      <span>Assigned to</span>
      <select name="Select Contacts to assign" placeholder="Select Contacts to assign" id="taskAssigned" "="">
  <option disabled="" selected="" hidden="">Select Contacts to assign</option>
  <option value="Hulk Hgan">
  Hulk Hgan</option>

    <option value="Peter Lustig">
      Peter Lustig
    </option>
    <option value="Rosi Rose">
      Rosi Rose
    </option>
  </select>
      <span>Due date</span>
      <input required="" class=" right-taskfield-input" type="date" placeholder="dd/mm/yyyy" name="" id="taskDate">
        <span>Prio</span>
        <div class="button-urgent-J">
          <button onclick="setPriorityUrgent()" id="taskButtonUrgent" class="urgent-J">Urgent<img src="assets/img/prio-urgent.svg"></button>
          <button onclick="setPriorityMedium()" id="taskButtonMedium" class="medium-J">Medium<img src="assets/img/prio-medium.svg"></button>
          <button onclick="setPriorityLow()" id="taskButtonLow" class="low-J">Low<img src="assets/img/prio-low.svg"></button>
        </div>
    </div>
    <div class="button-container-J">
      <button onclick="taskClearButton()" class="button button-white mobile-Button-J">Clear<img src="assets/img/icon-black-clear.svg"></button>
      <button onclick="addTaskToUser()" class="button button-darkblue">Create Task<img src="assets/img/icon-white-create.svg"></button>
    </div>
`;
}

//TODO BACKEND WURDE ZERSCHOSSEN

/* async function deleteTask(i, j) {
  userData[currentUser].board[i].boardlistTasks.splice(j, 1);
  await backend.setItem('users', JSON.stringify(userData[currentUser]));
  downloadUserDataFromBackend();
} */

function slideInAddTask() {
  document.getElementById('slideInAddTaskWrapper').classList.remove('d-none')
  document.getElementById('slideInAddTask').classList.remove('d-none')

}

function cancelButton() {
  document.getElementById('slideInAddTaskWrapper').classList.add('d-none')
  document.getElementById('slideInAddTask').classList.add('d-none')
}

function closeWorkTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('workTaskContainerD').classList.remove('d-none');
}

//Suchfunktion
function filterTasks() {
  let search = document.getElementById('findTaskD').value.toLowerCase();
  let workTaskContainer = document.getElementById('workTaskContainerD');
  workTaskContainer.innerHTML = '';
  for (let i = 0; i < userData[currentUser].board.length; i++) {
    let board = userData[currentUser].board[i];
    for (let j = 0; j < board.boardlistTasks.length; j++) {
      let task = board.boardlistTasks[j];
      if (task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
        // TODO toString().toLowerCase() nochmal nachlesen
        workTaskContainer.innerHTML += generateBoardTemplate(i, j, task);
      }
    }
  }
}





// TODO DRAG N DROP 
/* const workTasks = document.querySelectorAll('.work-task-D');
let dragStartIndex;
let dragOverIndex;

workTasks.forEach(workTask => {
  workTask.addEventListener('dragstart', dragStart);
  workTask.addEventListener('dragend', dragEnd);
  workTask.addEventListener('dragover', dragOver);
  workTask.addEventListener('dragenter', dragEnter);
  workTask.addEventListener('dragleave', dragLeave);
  workTask.addEventListener('drop', drop);
});

function dragStart() {
  dragStartIndex = parseInt(this.id.split('-')[3]);
}

function dragEnd() {
  // Update the board with the new task order
  const boardList = userData[currentUser].board.boardlistTasks;
  const task = boardList.splice(dragStartIndex, 1)[0];
  boardList.splice(dragOverIndex, 0, task);
  generateBoard();
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add('drag-enter');
}

function dragLeave() {
  this.classList.remove('drag-enter');
}

function drop() {
  dragOverIndex = parseInt(this.id.split('-')[3]);
  this.classList.remove('drag-enter');
}
 */
