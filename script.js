// NOTE Einbindung smalles_backend_ever

setURL('https://sascha-schroeder.developerakademie.net/smallest_backend_ever');

let userData = [];
loadUsers();

async function loadUsers() {
  await downloadFromServer();
  userData = JSON.parse(backend.getItem('users')) || [];
  console.log(userData);
  showCurrentUser();
}

async function addUser(loginName, loginEmail) {
  let newUser = { name: loginName, email: loginEmail };
  userData.push(newUser);
  await backend.setItem('users', JSON.stringify(userData));
  loadUsers();
}

async function deleteUser(arrayPosition) {
  userData.splice(arrayPosition, 1);
  await backend.setItem('users', JSON.stringify(userData));
  loadUsers();
}

function showCurrentUser() {
  let currentUserName = userData[0].name;
  console.log('Current login: ', currentUserName);
}








// NOTE Mit activeLogin könen wir die src für das Profilbild ändern
function templateDesktopHeader(activeLogin) {
  let desktopHeader = document.getElementById('desktopHeader');
  desktopHeader.innerHTML = '';
  desktopHeader.innerHTML += /*html*/ `
    < h2 class="font-weight-400" > Kanban Project Management Tool</ >
      <div class="desktop-header-right-wrapper">
        <a href="help.html">
          <img class="icon-size-32" src="assets/img/icon-help-head.svg" alt="Help button">
        </a>
        <img class="icon-size-49 portrait-blue-ring" src="assets/portraits/profile-sascha.jpg" alt="">
      </div>
  `;
}

function templateDesktopNavbar() {
  let desktopNavbar = document.getElementById('desktopNavbar');
  desktopNavbar.innerHTML = '';
  desktopNavbar.innerHTML += /*html*/ `
    < div class="desktop-navbar-top" >
      <a href="summary.html">
        <img class="icon-size-120" src="assets/img/logo-white.svg" alt="Join Logo">
      </a>

      <div class="desktop-navbar-wrapper">
        <a class="desktop-navbar-link" href="summary.html">
          <img class="icon-size-32" src="assets/img/icon-summary.svg" alt="">Summary
        </a>
        <a class="desktop-navbar-link" href="board.html"><img class="icon-size-32" src="assets/img/Icon-board.svg"
        alt="">Board</a>
        <a class="desktop-navbar-link" href="add_task.html"><img class="icon-size-32"
        src="assets/img/icon-add-task.svg" alt="">Add task</a>
        <a class="desktop-navbar-link" href="contacts.html"><img class="icon-size-32"
        src="assets/img/icon-contacts 13.svg" alt="">Contacts</a>
      </div>
    </ >

    <div class="desktop-navbar-wrapper">
      <a class="desktop-navbar-link" href="imprint.html"><img class="icon-size-32" src="assets/img/icon-legal.svg"
        alt="">Legal
        notice
      </a>
      <a class="desktop-navbar-link" href="imprint.html#privacy"><img class="icon-size-32" src="assets/img/icon-legal.svg"
        alt="">Privacy
        policy
      </a>
    </div>
  `;
}

// NOTE Mit activeLogin könen wir die src für das Profilbild ändern
function templateMobileHeader() {
  let mobileHeader = document.getElementById('mobileHeader');
  mobileHeader.innerHTML = '';
  mobileHeader.innerHTML += /*html*/ `
    < a href = "index.html" >
      <img class="icon-size-49" src="assets/img/join-logo.svg" alt="Join Logo">
    </>
    <img class="icon-size-49 portrait-blue-ring" src="assets/portraits/profile-sascha.jpg" alt="">
  `;
}

function templateMobileNavbar() {
  let mobileNavbar = document.getElementById('mobileNavbar');
  mobileNavbar.innerHTML = '';
  mobileNavbar.innerHTML += /*html*/ `
    <a class="mobile-navbar-link" href="summary.html">
      <img class="icon-size-32" src="assets/img/icon-summary.svg" alt="">Summary
    </a>
    <a class="mobile-navbar-link" href="board.html"><img class="icon-size-32" src="assets/img/Icon-board.svg"
        alt="">Board</a>
    <a class="mobile-navbar-link" href="add_task.html"><img class="icon-size-32" src="assets/img/icon-add-task.svg"
        alt="">Add task</a>
    <a class="mobile-navbar-link" href="contacts.html"><img class="icon-size-32" src="assets/img/icon-contacts 13.svg"
        alt="">Contacts</a>
  `;
}


function init() {
  templateDesktopHeader();
  templateDesktopNavbar();
  templateMobileHeader();
  templateMobileNavbar();
}

