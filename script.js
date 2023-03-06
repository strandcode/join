// NOTE Mit activeLogin könen wir die src für das Profilbild ändern
function templateDesktopHeader(activeLogin) {
  let desktopHeader = document.getElementById('desktopHeader');
  desktopHeader.innerHTML = '';
  desktopHeader.innerHTML += /*html*/ `
    <h2 class="font-weight-400">Kanban Project Management Tool</h2>
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
    <div class="desktop-navbar-top">
      <a href="index.html">
        <img class="icon-size-120" src="assets/img/logo-white.svg" alt="Join Logo">
      </a>

      <div class="desktop-navbar-wrapper">
        <a class="desktop-navbar-link" href="index.html">
          <img class="icon-size-32" src="assets/img/icon-summary.svg" alt="">Summary
        </a>
        <a class="desktop-navbar-link" href="board.html"><img class="icon-size-32" src="assets/img/Icon-board.svg"
        alt="">Board</a>
        <a class="desktop-navbar-link" href="add_task.html"><img class="icon-size-32"
        src="assets/img/icon-add-task.svg" alt="">Add task</a>
        <a class="desktop-navbar-link" href="contacts.html"><img class="icon-size-32"
        src="assets/img/icon-contacts 13.svg" alt="">Contacts</a>
      </div>
    </div>

    <div class="desktop-navbar-wrapper">
      <a class="desktop-navbar-link" href="imprint.html"><img class="icon-size-32" src="assets/img/icon-legal.svg"
          alt="">Legal
        notice
      </a>
      <a class="desktop-navbar-link" href="imprint.html"><img class="icon-size-32" src="assets/img/icon-legal.svg"
          alt="">Privacy
        policy
      </a>
    </div>
  `;
}

function init() {
  templateDesktopHeader();
  templateDesktopNavbar();
}