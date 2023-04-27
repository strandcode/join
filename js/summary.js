async function initSummary() {
  initHeader();
  initNavbar();
  try {
    userData = JSON.parse(await getItem('userData'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  initSummaryData();
}


function initSummaryData() {
  greetUserAtSummary();
  getQuantityOfBoardTasks();
  setNavbarItemActive('.navbar-summary');
}

const summaryTasksInBoard = document.getElementById('summaryTasksInBoard');
const summaryTasksInProgress = document.getElementById('summaryTasksInProgress');
const summaryTasksInFeedback = document.getElementById('summaryTasksInFeedback');
const summaryTasksQuantityUrgent = document.getElementById('summaryTasksQuantityUrgent');
const summaryTasksNextDeadline = document.getElementById('summaryTasksNextDeadline');
const summaryTasksToDo = document.getElementById('summaryTasksToDo');
const summaryTasksDone = document.getElementById('summaryTasksDone');


// TODO Funktionen noch zusammenfassen

function getQuantityOfBoardTasks() {
  summaryTasksInBoard.innerHTML = sumAllTasksInBoard();
  summaryTasksToDo.innerHTML = sumAllTasksInToDo();
  summaryTasksInProgress.innerHTML = sumAllTasksInProgress();
  summaryTasksInFeedback.innerHTML = sumAllTasksInAwaitingFeedback();
  summaryTasksDone.innerHTML = sumAllTasksInDone();
  summaryTasksQuantityUrgent.innerHTML = sumAllUrgentTasks();
  summaryTasksNextDeadline.innerHTML = getUpcomingDeadline();
}


function sumAllTasksInBoard() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].task_id) {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}

function sumAllTasksInToDo() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].boardList == 'To-Do') {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}

function sumAllTasksInProgress() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].boardList == 'In Progress') {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}

function sumAllTasksInAwaitingFeedback() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].boardList == 'Reviews') {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}
function sumAllTasksInDone() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].boardList == 'Done') {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}

function sumAllUrgentTasks() {
  let quantityOfTasks = 0;
  for (let i = 0; i < userData[currentUser].tasks.length; i++) {
    if (userData[currentUser].tasks[i].priority == 'urgent') {
      quantityOfTasks++;
    }
  }
  return quantityOfTasks;
}


function getUpcomingDeadline() {
  let currentDate = new Date();
  if (userData[currentUser].tasks.length > 0) {
    let upcomingDeadline = new Date(userData[currentUser].tasks[0].date); // konvertiert den ersten String-Datumswert als Vetrgleichswert in ein tatsächliches Datum

    for (let i = 1; i < userData[currentUser].tasks.length; i++) {
      let taskDate = new Date(userData[currentUser].tasks[i].date); // konvertiert das Datum von jedem Task in ein tatsächliches Datum
      if (taskDate < upcomingDeadline) {
        upcomingDeadline = taskDate;
      }
    }
    if (upcomingDeadline < currentDate) {
      summaryTasksNextDeadline.style.color = '#ff3d00';
    }
    let dateParameter = { year: 'numeric', month: 'long', day: 'numeric' };
    return upcomingDeadline.toLocaleDateString('en-US', dateParameter); // de-DE Deutschland, en-US für USA
  } else {
    return 'No deadlines';
  }
}



function greetUserAtSummary() {
  let welcomePhrase = setWelcomePhraseByDaytime();
  document.getElementById('userWelcome').innerHTML = '';
  if (userData[currentUser].firstName) {
    let welcomeName = userData[currentUser].firstName;
    document.getElementById('userWelcome').innerHTML += `<h3>${welcomePhrase}, ${welcomeName}</h3>`;
  } else {
    document.getElementById('userWelcome').innerHTML = `<h3>${welcomePhrase}</h3>`;
  }
}

function setWelcomePhraseByDaytime() {
  let welcomePhrase;
  let currentTime = new Date();
  currentTime = currentTime.getHours();
  if (currentTime >= 3 && currentTime < 12) { welcomePhrase = 'Good morning' };
  if (currentTime >= 12 && currentTime < 18) { welcomePhrase = 'Good afternoon' };
  if (currentTime >= 18 || currentTime < 3) { welcomePhrase = 'Good evening' };
  return welcomePhrase;
}


function referToBoard() {
  window.location.href = "board.html";
}