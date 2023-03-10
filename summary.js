function greetUserAtSummary (currentUser){
    document.getElementById('userWelcome').innerHTML = `<h3>Good Morning ${userData[currentUser].firstName}</h3>`;

}

setTimeout(greetUserAtSummary, 2000);