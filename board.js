let boardCategory = ['workStepsTodo', 'workStepsProgress', 'workStepsFeedback', 'workStepsDone'];




async function generateBoard() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  getCurrentUser();
  for (let i = 0; i < userData[currentUser].board.length; i++) {
    /* const card = document.getElementById(boardCategory[i]); */
    for (let j = 0; j < userData[currentUser].tasks.length; j++) {
      const boardCard = document.getElementById(`boardListBody-${i}`);
      boardCard.innerHTML += generateBoardTemplate(i, j);
    }
  }
}



function generateBoardTemplate(i, j) {
  return `    
  

  

    <div class="boardlist-card" onclick="openTask(${i},${j})" id="boardListCard${userData[currentUser].tasks[j]['task_id']}">

      <div class="work-category-D" id="workCategoryD">
      ${userData[currentUser].tasks[j]['category']} 
      </div>

      <h5 id="workTaskHeadlineD" class="work-task-headline-D">${userData[currentUser].tasks[j]['title']}</h5>

      <span class="work-task-content-D" id="workTaskContentD">${userData[currentUser].tasks[j]['description']}</span>

      <span><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span>
      <div class="task-user-wrapper" id="taskUserWrapper">
      <div class="work-user-D" id="workUserD">

        <span class="work-task-user-D ${userData[currentUser].contacts['avatar_bg_color']}" id="workTaskUserD">
        
        ${userData[currentUser].tasks[j]['assign_to_contacts']}
        </span>

        <span class="work-task-user-D" id="workTaskUserD">
        ${userData[currentUser].tasks[j]['assign_to_contacts']} 
        </span>

        <span class="work-task-user-D" id="workTaskUserD">
        ${userData[currentUser].tasks[j]['assign_to']} 
        </span>
      </div>
      <div class="urgency-image" id="urgencyImage">
      <img src="assets/img/prio-low.svg" alt="">
    </div>
      </div>
    </div>
  </div>
</div>
`;
}

function openTask(i, j) {

  document.getElementById('popUpTaskD').classList.remove('d-none');
  document.getElementById('workTaskContainerD').classList.add('d-none');
  let popupContainer = document.getElementById('popUpTaskD');
  popupContainer.innerHTML = `
  <div class="work-category-D" id="workCategoryD">
  ${userData[currentUser].tasks[j]['category']} 
  </div>
    <div class="close-work-overlay-D">
      <button onclick="closeWorkTask()">x</button>
    </div>
    <div class="work-overlay-headline-D">${userData[currentUser].tasks[j]['title']}</div>
    <span>${userData[currentUser].tasks[j]['description']}</span>
    <div class="work-overlay-date-D">
      <b>Due date:</b> <span class="overlay-date-D" id="overlayDateD">${userData[currentUser].tasks[j]['date']}</span>
    </div>
    <div class="priority-overlay-D">
      <b>Priority:</b><span>${userData[currentUser].tasks[j]['prio']}</span><img src="assets/img/priority-urgent.svg" alt="">
    </div>
    <div class="assigned-overlay-D">
      <b>Assigned To:</b>


      <div class="user-overlay-D">
        <span class="assigned-contact">
        <span>${userData[currentUser].tasks[j]['assign_to']['avatar_bg_color']}
              ${userData[currentUser].tasks[j]['assign_to']['avatar_initials']}</span>




        <span>${userData[currentUser].tasks[j]['assign_to']['firstName']}</span>
        <span>${userData[currentUser].tasks[j]['assign_to']['lastName']}</span>
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
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('changeTaskWrapper').classList.remove('d-none');
  let popUp2 = document.getElementById('changeTaskWrapper');
  popUp2.innerHTML += `
    
      <div class="left-taskfield-D">
      <div class="close-work-overlay-D">
      <button onclick="closeWorkTask()">x</button>
       </div>
        <span>Title</span>
        <input required type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitle">

        <span>Description</span>
        <textarea required class="width" placeholder="Enter a Description" name="Description" id="taskDescription"
          cols="30" rows="10"></textarea>

        <span>Due date</span>
        <input required class=" right-taskfield-input" type="date" placeholder="dd/mm/yyyy" name="" id="taskDate">
        <span>Prio</span>
        <div class=" button-urgent-J">
          <button onclick="setPriorityUrgent()" id="taskButtonUrgent" class="urgent-J">Urgent<img
              src="assets/img/prio-urgent.svg"></button>
          <button onclick="setPriorityMedium()" id="taskButtonMedium" class="medium-J">Medium<img
              src="assets/img/prio-medium.svg"></button>
          <button onclick="setPriorityLow()" id="taskButtonLow" class="low-J">Low<img
              src="assets/img/prio-low.svg"></button>
        </div>

        <div class="right-taskfield-D">
          <span>Assigned to</span>
          <select name="Select Contacts to assign" placeholder="Select Contacts to assign" id="taskAssigned" ">
        </select>

        <div class=" button-container-D">
            <button onclick="confirmChangeTask()" class="button button-darkblue">Ok
              <img src="assets/img/icon-white-create.svg"></button>
        </div>
      </div>
    </div>
  </div>
  </div>
`;
}


// TODO userData[currentUser].tasks[2] = 'deleted'
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
  document.getElementById('changeTaskWrapper').classList.add('d-none');
}

//TODO suchfunktion ab ändern
/* function filterTasks() {
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
} */
