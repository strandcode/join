async function addTaskToUser() {
  let taskBoardList = document.getElementById('taskBoardList');
  let taskTitle = document.getElementById('taskTitle');
  let taskDescription = document.getElementById('taskDescription');
  let taskCategory = document.getElementById('taskCategory');
  let taskAssigned = document.getElementById('taskAssigned');
  let taskDate = document.getElementById('taskDate');
  let taskButtonUrgent = document.getElementById('taskButtonUrgent').textContent;
  let taskButtonMedium = document.getElementById('taskButtonMedium');
  let taskButtonLow = document.getElementById('taskButtonLow');

  let selectedBoardList = taskBoardList.value;
  let selectedTaskCategory = taskCategory.value;

  let newTask = {
    boardList: selectedBoardList,
    title: taskTitle.value,
    description: taskDescription.value,
    category: selectedTaskCategory,
    assigned_to: taskAssigned.value,
    date: taskDate.value,
    prio: '',    
  };

  


  

  userData[0].tasks.push(newTask);
  await backend.setItem('users', JSON.stringify(userData));
  loadUsers();
}



function taskClearButton () {
   taskBoardList.value = '';
   taskTitle.value = '';
   taskDescription.value = '';
   taskCategory.value = '';
   taskAssigned.value = '';
   taskDate.value = '';
   taskButtonUrgent.value = '';
   taskButtonMedium.value = '';
   taskButtonLow.value = '';
}

function setPriority () {
 
  let taskButtonUrgent = document.getElementById('taskButtonUrgent');
  taskButtonUrgent.style.backgroundColor = "red";
  taskButtonUrgent.classList.add("active");

  let taskButtonMedium = document.getElementById('taskButtonMedium');
  taskButtonMedium.style.backgroundColor = "orange";
  taskButtonMedium.classList.add("active");

  let taskButtonLow = document.getElementById('taskButtonLow');
  taskButtonLow.style.backgroundColor = "green";
  taskButtonLow.classList.add("active");
}



function generateContactDropdown(userData) {
  const dropdownContacts = document.getElementById("taskAssigned");
  dropdownContacts.innerHTML = '';

  for (let i = 0; i < userData.contacts.length; i++) {
    const contactList = 
  }
}







// taskButtonUrgent.addEventListener('click', () => {
//   taskButtonUrgent.classList.toggle('active');
// });

// taskButtonMedium.addEventListener('click', () => {
//   taskButtonMedium.classList.toggle('active');
// });

// taskButtonLow.addEventListener('click', () => {
//   taskButtonLow.classList.toggle('active');
// });




