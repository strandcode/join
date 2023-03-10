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
  }, 2000);
}

function loginUser() {
  let email = document.getElementById('loginEmail');
  let password = document.getElementById('loginPassword');
  let user = userData.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    console.log('User gefunden');
    window.location.href = 'summary.html';
    email.value = '';
    password.value = '';
  } else {
    console.warn('User nicht gefunden');
    email.value = '';
    password.value = '';
  }
}


function sendEmailToUser() {
  let email = document.getElementById('loginEmail');
  let sendEmailButton = document.getElementById('sendEmailButton');
  let user = users.find(u => u.email == email.value);
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
    }, 2000);
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
    users[0].password = newLoginPassword.value;
    resetPasswordButton.innerHTML = '';
    resetPasswordButton.innerHTML = /*html*/ `
      <span>Your password has been changed.</span>
    `;
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 2000);
  }
}
