//let priority = ["assets/img/prio-low.svg", "assets/img/prio-medium.svg", "assets/img/prio-urgent.svg"];
// let board = [];

//  NOTE  STRUKTUR DES ARRAYS   --->  Durch iterieren  ---->    

//  userData[currentUser].board[0]boardlistTasks[0{TASK}]
let boardCategory = ['workStepsTodo', 'workStepsProgress', 'workStepsFeedback', 'workStepsDone'];


async function generateBoard() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  getCurrentUser()
  //board = userData[currentUser].board[boardIndex];
  const boardList = userData[currentUser].board;
  console.log(boardList.length);
  let card;

  for (let i = 0; i < boardList.length; i++) {
    card = document.getElementById(boardCategory[i]);
    //card.innerHTML += `<div>${boardList[i].boardlistTitle} </div>`;

    for (let j = 0; j < boardList[i].boardlistTasks.length; j++) {

      card.innerHTML = '';
      const task = boardList[i].boardlistTasks[j];
      card.innerHTML += `
      
      
      <div class="work-task-category-D" id="workTaskCategoryD">
          <h4>${boardList[i].boardlistTitle}</h4> 
          <button id="smallPlusD" class="small-plus-D" onclick="addTask()"><img
          src="assets/img/icon-add-plus-dark.svg" alt="">
          </button></div>

      <div onclick="openTask(${i})" class="work-task-D" id="work-task-D-${i}">
        <div class="work-category-D ${task['category']}">${task['category']}</div>
        <div class="work-task-headline-D">${task['title']}</div>
        <div class="work-task-content-D">${task['description']}</div>
        <span><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span> 
        <div class="work-user-D">
          <div class="work-task-user-D ${task['taskAssigned']}"> 
            <div class="task-contact-1">U1</div>
            <div class="task-contact-2"></div>
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
  }
}

/* function openTask(boardIndex, boardListIndex, taskIndex) {
    document.getElementById('popUpTaskD').classList.remove('d-none');
    const board = userData[currentUser].board[boardIndex];
    const boardList = board.boardlistTasks[boardListIndex];
    let task = boardList[taskIndex];
    let popupContainer = document.getElementById('popUpTaskD');
    popupContainer.innerHTML = `
    <div class="work-category-D" id="taskCategoryOverlayD">
      ${task['label']}
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
        <span>${task['assigned_to']}</span>  
      </div>
      <div class="pop-up-change-button">
        <button onclick="changePopUp()">
          <img src="assets/img/summary-pencil.svg" alt="">
        </button>
      </div>
    </div>
  `;
} */


function closeWorkTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
}

function changeTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
}
