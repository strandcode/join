async function initSummary() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  userData = await JSON.parse(backend.getItem('users')) || [];
  getCurrentUser();
  let currentUserData = userData[currentUser];
  showCurrentUser(currentUser, currentUserData);
  if (currentUserData) {
    greetUserAtSummary();
    getQuantityOfBoardTasks();
  } else {
    console.error('No data found');
  }
}

const summaryTasksInBoard = document.getElementById('summaryTasksInBoard');
const summaryTasksInProgress = document.getElementById('summaryTasksInProgress');
const summaryTasksInFeedback = document.getElementById('summaryTasksInFeedback');
const summaryTasksQuantityUrgent = document.getElementById('summaryTasksQuantityUrgent');
const summaryTasksNextDeadline = document.getElementById('summaryTasksNextDeadline');
const summaryTasksToDo = document.getElementById('summaryTasksToDo');
const summaryTasksDone = document.getElementById('summaryTasksDone');


function getQuantityOfBoardTasks() {
  summaryTasksInBoard.innerHTML = sumAllTasksInBoard();
  summaryTasksToDo.innerHTML = userData[currentUser].board[0].boardlistTasks.length
  summaryTasksInProgress.innerHTML = userData[currentUser].board[1].boardlistTasks.length;
  summaryTasksInFeedback.innerHTML = userData[currentUser].board[2].boardlistTasks.length;
  summaryTasksDone.innerHTML = userData[currentUser].board[3].boardlistTasks.length;
}

function sumAllTasksInBoard() {
  let quantityOfTasks =
    (userData[currentUser].board[0].boardlistTasks.length +
      userData[currentUser].board[1].boardlistTasks.length +
      userData[currentUser].board[2].boardlistTasks.length +
      userData[currentUser].board[3].boardlistTasks.length);
  console.log(quantityOfTasks);
  return quantityOfTasks;
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
  console.log(currentTime);
  if (currentTime >= 5 && currentTime < 11) { welcomePhrase = 'Good morning' };
  if (currentTime >= 11 && currentTime < 18) { welcomePhrase = 'Good afternoon' };
  if (currentTime >= 18 && currentTime < 22) { welcomePhrase = 'Good evening' };
  if (currentTime >= 22 && currentTime < 5) { welcomePhrase = 'Good night' };
  return welcomePhrase;
}

// TODO get quantity of urgent tasks
// TODO get next deadline