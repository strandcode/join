async function downloadSpecificUserDataFromBackend() {
  setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
  await downloadFromServer();
  userData = await JSON.parse(backend.getItem('users')) || [];
  getCurrentUser();
  let currentUserData = userData[currentUser];
  showCurrentUser(currentUser, currentUserData);
  greetUserAtSummary();
}

downloadSpecificUserDataFromBackend();

function greetUserAtSummary() {
  document.getElementById('userWelcome').innerHTML = `
  <h3>Good Morning,<br> ${userData[currentUser].firstName}</h3>`;
}

