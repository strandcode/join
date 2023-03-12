
async function downloadUserSummaryDataFromBackend() {
  try {
    setURL('https://gruppe-05i.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    userData = await JSON.parse(backend.getItem('users')) || [];
    console.log(userData);
    getCurrentUser();
    showCurrentUser(currentUser);
    greetUserAtSummary();
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

downloadUserSummaryDataFromBackend();

function greetUserAtSummary() {
  document.getElementById('userWelcome').innerHTML = `
  <h3>Good Morning,<br> ${userData[currentUser].firstName}</h3>`;
}

