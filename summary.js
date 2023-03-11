function greetUserAtSummary() {
  document.getElementById('userWelcome').innerHTML = `
  <h3>Good Morning,<br> ${userData[currentUser].firstName}</h3>`;
}

setTimeout(greetUserAtSummary, 1500);