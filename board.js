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
  console.log(boardList.length);
  let card;
  for (let i = 0; i < boardList.length; i++) {
    card = document.getElementById(boardCategory[i]);
    for (let j = 0; j < boardList[i].boardlistTasks.length; j++) {
      card.innerHTML = '';
      const task = boardList[i].boardlistTasks[j];
      card.innerHTML += generateBoardTemplate(i, j, task)
      const box = document.getElementById(`work-task-D-${i}`);
      box.addEventListener('dragstart', dragStart);
      box.addEventListener('dragover', dragOver);
      box.addEventListener('drop', drop);
    }
  }
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  console.log('dragging')
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

}


function generateBoardTemplate(i, j, task) {
  const boardList = userData[currentUser].board;
  return `    
  <div class="work-task-category-D" id="workTaskCategoryD">
      <h4>${boardList[i].boardlistTitle}</h4> 
      <button id="smallPlusD" class="small-plus-D" onclick="slideInAddTask()"><img
      src="assets/img/icon-add-plus-dark.svg" alt="">
      </button></div>
      <div onclick="openTask(${i}, ${j})" class="work-task-D" draggable="true" id="work-task-D-${i}">
    <div class="work-category-D ${task['category']}">${task['category']}</div>
    <div class="work-task-headline-D">${task['title']}</div>
    <div class="work-task-content-D">${task['description']}</div>
    <span><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span> 
    <div class="work-user-D">
    <div class="work-task-user-D ${task['assigned_to']}"> 
     
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
      <b>Priority</b><img src="assets/img/priority-urgent.svg" alt="">
    </div>
    <div class="assigned-overlay-D">
      <b>Assigned To:</b>
      <div class="user-overlay-D">
        <span class="assigned-contact">
       
        
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
  
  <div id="popUp2Wrapper" class="pop-up-2-wrapper">
        <div id="popUp2" class="pop-up-2">
          <div class="pop-up-2-title">
            Title
            <input placeholder="Enter a title">
          </div>
          <div class="pop-up-2-description">
             Description
             <input placeholder="Enter a Description">
          </div>
          <div class="pop-up-2-date">
            Due date
            <input type="date">
          </div>
          <div class="pop-up-2-prio">
            Prio
            <button onclick="urgent()">Urgent <img id="urgent_img" src="assets/img/prio-urgent.svg"></button>
            <button onclick="medium()">Medium<img id="medium_img" src="assets/img/prio-medium.svg"</button>
            <button onclick="low()">Low<img id="low_img" src="assets/img/prio-low.svg"></button>
          </div>
          <div class="pop-up-2-assigned">
            Assigned to
            <select>
              <option>Select contacts to assign</option>
              <option>Contact 1</option>
              <option>Contact 2</option>
              <option>Contact 3</option>
            </select>
          <button class=" button-darkblue" onclick="taskInfoChanged()">
            Ok<img src="assets/img/icon-check-dark.svg" alt="">
          </button>
          <div class="close-work-overlay-D">
            <button onclick="closeWorkTask()">x</button>
          </div>
          </div>
        `;
}
function slideInAddTask() {
  document.getElementById('slideInAddTaskWrapper').classList.remove('d-none')
  document.getElementById('slideInAddTask').classList.remove('d-none')
  /*  let addTaskPopUp = document.getElementById('slideInAddTask');
   addTaskPopUp.innerHTML = ``; */
}

function CancelButton() {
  document.getElementById('slideInAddTaskWrapper').classList.add('d-none')
  document.getElementById('slideInAddTask').classList.add('d-none')
}

function closeWorkTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('workTaskContainerD').classList.remove('d-none');
}


/* //TODO
function changeTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
}
 */

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
