const checkboxRememberMe = document.getElementById('checkboxRememberMe');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginMessage = document.getElementById('loginMessage');



function loginUser() {
  let user = userData.find(u => u.email == loginEmail.value && u.password == loginPassword.value);
  if (!user) {
    showLoginMessage('Server nicht gefunden.');
  }
  console.log(user);
  let index = userData.indexOf(user);
  console.log(index);
  if (user) {
    setCurrentUser(index);
    checkIfRememberMeIsActive();
    clearFormInputValues();
    window.location.href = 'summary.html';
  } else {
    showLoginMessage('Login not found. Please try again.');
    clearFormInputValues();
  }
}

async function downloadUserContactDataFromBackend() {
  try {
    setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    userData = await JSON.parse(backend.getItem('users')) || [];
    console.log(userData);
    getCurrentUser();
    showCurrentUser(currentUser);
    renderContactsList();
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}


function showLoginMessage(message) {
  loginMessage.classList.remove('d-none');
  loginMessage.innerHTML = message;
}


function clearFormInputValues() {
  loginEmail.value = '';
  loginPassword.value = '';
}

function loginGuestUser() {
  setCurrentUser(0);
  window.location.href = 'summary.html';
}

function setCurrentUser(currentUserIndex) {
  localStorage.setItem('currentUser', currentUserIndex);
}

function checkIfRememberMeIsActive() {
  if (checkboxRememberMe.checked) {
    localStorage.rememberMe = true;
    localStorage.loginEmail = loginEmail.value;
  } else {
    localStorage.rememberMe = false;
    localStorage.loginEmail = '';
  }
}

function checkForStoredLogin() {
  if (localStorage.rememberMe && localStorage.rememberMe == 'true') {
    console.log('Remember is true');
    loginEmail.value = localStorage.loginEmail;
    checkboxRememberMe.checked = true;
  }
}

function signupUser() {
  let firstName = document.getElementById('signUpFirstName');
  let lastName = document.getElementById('signUpLastName');
  let email = document.getElementById('signUpEmail');
  let password = document.getElementById('signUpPassword');
  let signupButton = document.getElementById('signupButton');
  addUser(firstName.value, lastName.value, email.value, password.value);
  console.log('User wurde angelegt');

  signupButton.innerHTML = '';
  signupButton.innerHTML = /*html*/ `
    <span>Registration successful.</span>
  `;
  setTimeout(function () {
    window.location.href = 'index.html';
  }, 3000);
}


function sendEmailToUser() {
  let email = document.getElementById('loginEmail');
  let sendEmailButton = document.getElementById('sendEmailButton');
  let user = userData.find(u => u.email == email.value);
  if (user) {
    console.log('Email gefunden');
    sendEmailButton.innerHTML = '';
    sendEmailButton.innerHTML = /*html*/ `
      <img src="assets/img/send_check.svg" alt="">
      <span>An E-Mail has been sent to you</span>
    `;
    // TODO Send Email to user php.script
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 3000);
  } else {
    console.warn('Email nicht gefunden');
  }
}

function resetUserPassword() {
  let newLoginPassword = document.getElementById('newLoginPassword');
  let confirmLoginPassword = document.getElementById('newLoginPassword');
  if (newLoginPassword.value == confirmLoginPassword.value) {
    // TODO Richtigen user mit übermitteln
    console.log('Password stimmt überein');
    userdata[0].password = newLoginPassword.value;
    resetPasswordButton.innerHTML = '';
    resetPasswordButton.innerHTML = /*html*/ `
      <span>Your password has been changed.</span>
    `;
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 2000);
  }
}

// function setCurrentUser(currentUserIndex) {
//   let encryptedCurrentUserIndex = (currentUserIndex * 12) + 4;
//   localStorage.setItem('currentUser', encryptedCurrentUserIndex);
// }
