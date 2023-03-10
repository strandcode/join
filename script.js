let localeUserData = [];
// LINK https://github.com/JunusErgin/smallest_backend_ever
// NOTE Setting of backend
// TODO Import mini_backend.js

let users;


function addUser() {
  let newUser = { firstName: 'Max', lastName: 'Muster', email: 'peter@lustig.de', password: '1234' };
  let testuser = localeUserData.users.push(newUser);
  console.log(testuser);
  backend.setItem('users', JSON.stringify(testuser));
}

setTimeout(addUser, 2000);

// async function deleteUser(name) {
//   await backend.deleteItem('users');
// }

// NOTE Zentrales Spiegelbild vom Backend
// TODO Im Backend speichern
// TODO Chrome Extension Allow cors access control installiert?


// let users = [
//   { 'firstName': 'John', 'lastname': 'Doe', 'email': 'test@test.de', 'password': 'test123' }
// ];


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

