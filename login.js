// TODO Im Backend speichern

let users = [
  { 'firstName': 'John', 'lastname': 'Doe', 'email': 'test@test.de', 'password': 'test123' }
];



function signupUser() {
  let firstName = document.getElementById('signUpFirstName');
  let lastName = document.getElementById('signUpLastName');
  let email = document.getElementById('signUpEmail');
  let password = document.getElementById('signUpPassword');
  users.push({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value });
  console.log('User wurde angelegt');
  window.location.href = 'index.html';
}

function loginUser() {
  let email = document.getElementById('loginEmail');
  let password = document.getElementById('loginPassword');

  let user = users.find(u => { u.email == email.value && u.password == password.value });
  console.log(user);
  if (user) {
    console.log('User gefunden');
    window.location.href = 'summary.html';
  } else {
    console.log('User nicht gefunden');
  }
}




