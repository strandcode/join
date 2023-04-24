
let currentUser = 0; // TODO currentUser aus Storage übernemhen

async function getCurrentUser() {
  return parseInt(await getItem('currentUser'));
}

let userData = [];


async function resetDemoUser() {
  if (userData.length > 0) {
    userData.splice(0, 1, demoUser);
  } else {
    userData.push(demoUser);
  }
  await saveToStorage();
}


// ################## LOAD ########################

async function loadFromStorage() {
  try {
    userData = JSON.parse(await getItem('userData'));
    console.log(userData);
  } catch (e) {
    console.error('Loading error: ', e);
  }
}


// ################## SAVE ########################
async function saveToStorage() {
  try {
    await setItem('userData', JSON.stringify(userData));
  } catch (e) {
    console.error('Saving error: ', e);
  }
}




// TODO more content
const demoUser = {
  'firstName': 'Jane',
  LastName: 'Roe',
  email: 'jane@roe.com',
  password: '1234',
  contacts: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      phone: '+44 123 654 879',
      avatar_initials: 'JD',
      avatar_bg_color: '#29ABE2'
    },
    {
      "firstName": "Alex",
      "lastName": "Müller",
      "email": "alex.mueller@example.com",
      "phone": "+49 123 56789",
      "avatar_initials": "AM",
      "avatar_bg_color": "#1abc9c"
    },
    {
      "firstName": "Herta-Emilia-Victoria",
      "lastName": "Schmidt",
      "email": "herta.schmidt@example.com",
      "phone": "+49 123 45678",
      "avatar_initials": "BS",
      "avatar_bg_color": "#2ecc71"
    },
    {
      "firstName": "Christian",
      "lastName": "Fischer",
      "email": "christian.fischer@example.com",
      "phone": "+49 123 23456",
      "avatar_initials": "CF",
      "avatar_bg_color": "#3498db"
    },
    {
      "firstName": "David",
      "lastName": "Weber",
      "email": "david.weber@example.com",
      "phone": "+49 123 78901",
      "avatar_initials": "DW",
      "avatar_bg_color": "#9b59b6"
    },
    {
      "firstName": "Emma",
      "lastName": "Wagner",
      "email": "emma.wagner@example.com",
      "phone": "+49 123 12345",
      "avatar_initials": "EW",
      "avatar_bg_color": "#34495e"
    },
    {
      "firstName": "Felix",
      "lastName": "Bauer",
      "email": "felix.bauer@example.com",
      "phone": "+49 123 89012",
      "avatar_initials": "FB",
      "avatar_bg_color": "#f1c40f"
    },
    {
      "firstName": "Greta",
      "lastName": "Hoffmann",
      "email": "greta.hoffmann@example.com",
      "phone": "+49 123 45670",
      "avatar_initials": "GH",
      "avatar_bg_color": "#e67e22"
    },
    {
      "firstName": "Hans",
      "lastName": "Koch",
      "email": "hans.koch@example.com",
      "phone": "+49 123 12340",
      "avatar_initials": "HK",
      "avatar_bg_color": "#e74c3c"
    },
    {
      "firstName": "Isabella",
      "lastName": "Lehmann",
      "email": "isabella.lehmann@example.com",
      "phone": "+49 123 56780",
      "avatar_initials": "IL",
      "avatar_bg_color": "#95a5a6"
    },
    {
      "firstName": "Julia",
      "lastName": "Maier",
      "email": "julia.maier@example.com",
      "phone": "+49 123 23450",
      "avatar_initials": "JM",
      "avatar_bg_color": "#d35400"
    },
    {
      "firstName": "Karl",
      "lastName": "Neumann",
      "email": "karl.neumann@example.com",
      "phone": "+49 123 78900",
      "avatar_initials": "KN",
      "avatar_bg_color": "#7f8c8d"
    }

  ],
  tasks: [
    {
      task_id: 1682355331263,
      boardList: 0,
      boardlistPosition: 0,
      title: "Explore Kanban Project Management Tool",
      description: "Explore Kanban Project Management Tool",
      category: "Learn new technology",
      assign_to_contacts:
        { firstname: 'Alex', lastname: 'Müller', initials: 'AM', bg_color: '#1abc9c' },
      date: "2023-04-30",
      prio: "urgent",
    }

  ],
  board: [
    { boardlistTitle: 'To do' },
    { boardlistTitle: 'In progress' },
    { boardlistTitle: 'Awaiting Feedback' },
    { boardlistTitle: 'Done' }
  ]
}





async function addUser(firstName, lastName, email, password) {
  let newUser = {
    firstName: firstName,
    LastName: lastName,
    email: email,
    password: password,
    contacts: [
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: '',
        avatar_initials: firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase(),
        avatar_bg_color: 'rebeccapurple' // addRandomColorToContactAvatar()
      }

    ],
    tasks: [],
    board: [
      { boardlistTitle: 'To do' },
      { boardlistTitle: 'In progress' },
      { boardlistTitle: 'Awaiting Feedback' },
      { boardlistTitle: 'Done' }
    ]
  }
  userData.push(newUser);
  saveToStorage();
};


async function deleteUser(arrayPosition) {
  userData.splice(arrayPosition, 1);
  await backend.setItem('users', JSON.stringify(userData));
  downloadUserDataFromBackend();
}

function showCurrentUser(currentUser, currentUserData) {
  let currentUserName = userData[currentUser].firstName + ' ' + userData[currentUser].LastName;
  console.log('currentLoginName: ' + currentUserName);
  console.log('currentUserIndex: ' + currentUser);
  console.log(currentUserData);
  const currentUserLogin = document.getElementById('currentUserLogin');
  currentUserLogin.innerHTML = '';
  currentUserLogin.innerHTML = userData[currentUser].firstName + ' ' + userData[currentUser].LastName;
}


// NOTE Mit activeLogin könen wir die src für das Profilbild ändern
function templateDesktopHeader(activeLogin) {
  let desktopHeader = document.getElementById('desktopHeader');
  desktopHeader.innerHTML = '';
  desktopHeader.innerHTML += /*html*/ `
    <h2 class="font-weight-400">Kanban Project Management Tool</h2>
      <div class="desktop-header-right-wrapper">
      <span id="currentUserLogin"></span>
      <a href="help.html">
          <img class="icon-size-32" src="assets/img/icon-help-head.svg" alt="Help button">
        </a>
        <img class="icon-size-49 portrait-blue-ring" src="assets/portraits/profile-jane.webp" alt="">
      </div>
  `;
}


function setNavbarItemActive(classSelector) {
  let allNavbarItems = document.querySelectorAll('.desktop-navbar-link, .mobile-navbar-link');
  allNavbarItems.forEach(navbarItem => {
    navbarItem.classList.remove('navbar-item-active');
  });

  let navbarItems = document.querySelectorAll(classSelector);
  navbarItems.forEach(navbarItem => {
    navbarItem.classList.add('navbar-item-active');
  });
}




function templateDesktopNavbar() {
  let desktopNavbar = document.getElementById('desktopNavbar');
  desktopNavbar.innerHTML = '';
  desktopNavbar.innerHTML += /*html*/ `
    <div class="desktop-navbar-wrapper">
      <a href="index.html">
        <img class="icon-size-120" src="assets/img/logo-white.svg" alt="Join Logo">
      </a>
      
      <div class="desktop-navbar-top">
        <a class="desktop-navbar-link navbar-summary" href="summary.html">
        <img class="icon-size-32" src="assets/img/icon-summary.svg" alt="">Summary
        </a>
        <a class="desktop-navbar-link navbar-board" href="board.html"><img class="icon-size-32" src="assets/img/Icon-board.svg"
        alt="">Board</a>
        <a class="desktop-navbar-link navbar-task" href="add_task.html"><img class="icon-size-32"
        src="assets/img/icon-add-task.svg" alt="">Add task</a>
        <a class="desktop-navbar-link navbar-contacts" href="contacts.html"><img class="icon-size-32"
        src="assets/img/icon-contacts 13.svg" alt="">Contacts</a>
      </div>
      
      <div class="desktop-navbar-bottom">
        <a class="desktop-navbar-link navbar-legal" href="imprint.html"><img class="icon-size-32" src="assets/img/icon-legal.svg"
        alt="">Legal
        notice
      </a>
      <a class="desktop-navbar-link navbar-privacy" href="imprint.html#privacy"><img class="icon-size-32" src="assets/img/icon-legal.svg"
      alt="">Privacy
      policy
    </a>
  </div>
</div>
  `;
}

// NOTE Mit activeLogin könen wir die src für das Profilbild ändern
function templateMobileHeader() {
  let mobileHeader = document.getElementById('mobileHeader');
  mobileHeader.innerHTML = '';
  mobileHeader.innerHTML += /*html*/ `
    <a href="index.html">
      <img class="icon-size-49" src="assets/img/join-logo.svg" alt="Join Logo">
    </a>
    <button id="mobileHeaderAddTasksToUserButton" onclick="addTaskToUser()" class="button button-darkblue d-none">Create
      <img src="assets/img/icon-white-create.svg">
    </button>
    <img id="mobileHeaderPortrait" class="icon-size-49 portrait-blue-ring" src="assets/portraits/profile-jane.webp" alt="">
  `;
}

function templateMobileNavbar() {
  let mobileNavbar = document.getElementById('mobileNavbar');
  mobileNavbar.innerHTML = '';
  mobileNavbar.innerHTML += /*html*/ `
  <div class="mobile-navbar-link navbar-summary">

    <a class="mobile-navbar-link" href="summary.html">
      <img class="icon-size-32" src="assets/img/icon-summary.svg" alt="">Summary
    </a>
  </div>
    <a class="mobile-navbar-link navbar-board" href="board.html"><img class="icon-size-32" src="assets/img/Icon-board.svg"
        alt="">Board</a>
    <a class="mobile-navbar-link navbar-task" href="add_task.html"><img class="icon-size-32" src="assets/img/icon-add-task.svg"
        alt="">Add task</a>
    <a class="mobile-navbar-link navbar-contacts" href="contacts.html"><img class="icon-size-32" src="assets/img/icon-contacts 13.svg"
        alt="">Contacts</a>
  `;
}


function initHeader() {
  templateDesktopHeader();
  templateMobileHeader();
}

function initNavbar() {
  templateDesktopNavbar();
  templateMobileNavbar();
}






