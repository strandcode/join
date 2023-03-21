
async function generateBoard() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  getCurrentUser();
  for (let i = 0; i < userData[currentUser].board.length; i++) {
    const boardCard = document.getElementById(`boardListBody-${i}`);
    boardCard.innerHTML = ``;
    for (let j = 0; j < userData[currentUser].tasks.length; j++) {

      let a = i.toString();
      if (userData[currentUser].tasks[j].boardList == a) {
        boardCard.innerHTML += generateBoardTemplate(i, j);
      }
    }
  }
}

/* userData[currentUser].contacts[userData[currentUser].tasks[0].assign_to_contacts[0]].avatar_bg_color */

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
      

      


      </div>
      <div class="urgency-image" id="urgencyImage">
      <img id="prioImg2" src="" alt=""> ${userData[currentUser].tasks[j]['prio']}
    </div>
      </div>
    </div>
  </div>
</div>
`;
  priorityBoard(j);
}

function openTask(i, j) {
  document.getElementById('popUpTaskD').classList.remove('d-none');
  document.getElementById('workTaskContainerD').classList.add('d-none');
  let popupContainer = document.getElementById('popUpTaskD');
  popupContainer.innerHTML = `
  <div class="work-category-D" id="workCategoryD">
  ${userData[currentUser].tasks[j]['category']} 
  <div class="close-work-overlay-D">
  <button onclick="closeWorkTask()">x</button>
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
        <span class="assigned-contact">
        <span class="avatar-bg-color" style="background-color: ${userData[currentUser].contacts[userData[currentUser].tasks[0].assign_to_contacts[0]].avatar_bg_color}">
              ${userData[currentUser].contacts[userData[currentUser].tasks[0].assign_to_contacts[0]].avatar_initials}</span>

        <span class="first-name">${userData[currentUser].contacts[userData[currentUser].tasks[0].assign_to_contacts[0]].firstName} ${userData[currentUser].contacts[userData[currentUser].tasks[0].assign_to_contacts[0]].lastName}</span>
        </span>
        <div class="pop-up-change-button">
        <button onclick="changeTask(${i}, ${j})">
          <img src="assets/img/summary-pencil.svg" alt="">
        </button>
      </div>
    </div>
      </div>
    </div>
  `;
  priorityBoard2(j)
}




function changeTask(i, j) {
  document.getElementById('popUpTaskD').classList.add('d-none');
  document.getElementById('changeTaskWrapper').classList.remove('d-none');
  let popUp2 = document.getElementById('changeTaskWrapper');
  popUp2.innerHTML = /*html*/ `
    
      <div class="left-taskfield-D">
      <div class="close-work-overlay-D">
      <button onclick="closeWorkTask()">x</button>
       </div>
        <span>Title</span>
        <input required type="text" class="input-title-J width" placeholder="Enter a title" name="Title" id="taskTitleD${j}" 
        value="${userData[currentUser].tasks[j].title}">

        <span>Description</span>
        <textarea required class="width descript" placeholder="Enter a Description" name="Description" id="taskDescriptionD${j}"
        value="${userData[currentUser].tasks[j].description}"  cols="30" rows="10"></textarea>

        <span>Due date</span>
        <input required class=" right-taskfield-input" type="date" placeholder="dd/mm/yyyy" name="" id="taskDateD${j}"
        value="${userData[currentUser].tasks[j].date}">
        <span>Prio</span>
        <div class=" button-urgent-J">
          <button onclick="setPriorityUrgent()" id="taskButtonUrgentD" class="urgent-J">Urgent<img
              src="assets/img/prio-urgent.svg"></button>
          <button onclick="setPriorityMedium()" id="taskButtonMediumD" class="medium-J">Medium<img
              src="assets/img/prio-medium.svg"></button>
          <button onclick="setPriorityLow()" id="taskButtonLowD" class="low-J">Low<img
              src="assets/img/prio-low.svg"></button>
        </div>

        <div class="right-taskfield-D">
          <span>Assigned to</span>
          <select class="assigned-change" name="Select Contacts to assign" placeholder="Select Contacts to assign" id="taskAssignedD${j}"> 
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

//TODO - 
function confirmChangeTask(i, j) {
  document.getElementById('changeTaskWrapper').classList.add('d-none')
  document.getElementById('workTaskContainerD').classList.remove('d-none');
  // FIXME change to j
  let changeTitle = document.getElementById(`taskTitleD${j}`);
  let changeDescription = document.getElementById(`taskDescriptionD${j}`).value;
  let changeDate = document.getElementById(`taskDateD${j}`).value;
  let changeAssignedTo = document.getElementById(`taskAssignedD${j}`).value;


  userData[currentUser].tasks[j].title = changeTitle.value;
  userData[currentUser].tasks[j].description = changeDescription.value;
  userData[currentUser].tasks[j].date = changeDate.value;
  userData[currentUser].tasks[j].assign_to_contacts = changeAssignedTo.value;
  saveToBackend();
  setTimeout(generateBoard, 500);
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
    document.getElementById('prioImg2').src = 'assets/img/prio-urgent.svg';
  }

  if (priority2 == 'medium') {
    document.getElementById('prioImg2').src = 'assets/img/prio-medium.svg';
  }

  if (priority2 == 'low') {
    document.getElementById('prioImg2').src = 'assets/img/prio-low.svg';
  }
}