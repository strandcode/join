//let priority = ["assets/img/prio-low.svg", "assets/img/prio-medium.svg", "assets/img/prio-urgent.svg"];
// let board = [];

//  NOTE  STRUKTUR DES ARRAYS   --->  Durch iterieren  ---->    

//  userData[currentUser].board[0]boardlistTasks[0{TASK}]
let boardCategory = ['workStepsTodo', 'workStepsProgress', 'workStepsFeedback', 'workStepsDone'];


let allTasks = [
  {
    "title": "Website redesign",
    "description": "Modify the contents of the main website",
    "label": "Design",
    "assigned to": "Front-End Developer",
    "date": "2023-06-01",
    "prio": "low",
  },
  {
    "title": "Call potenital clients",
    "description": "Make the product presentation ",
    "label": "Sales",
    "assigned to": "User2",
    "date": "2023-06-01",
    "prio": "urgent",
  },
  {
    "title": "Accounting invoices",
    "description": "Write open invoices for customer",
    "label": "Backoffice",
    "assigned to": "User1,User4",
    "date": "2023-06-01",
    "prio": "medium",
  },
  {
    "title": "Social media strategy",
    "description": "Develop an ad campaign for our brand",
    "label": "Marketing",
    "assigned to": "",
    "date": "2023-06-01",
    "prio": "low",
  }
];

}


function generateTasks() {
  card = document.getElementById('workStepsD');
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    card.innerHTML += `
        <div onclick="openTask()" class="work-task-D" id="">
                <div class="work-category-D ${task['label']}">${task['label']}</div>
                <div class="work-task-headline-D">${task['title']}</div>
                <div class="work-task-content-D">${task['description']}</div>    
            <div class="work-user-D">
                <div class="work-task-user-D ${task['assigned to']}">
                <div class="task-contact-1"></div>
                <div class="task-contact-2"></div>
                <div class="task-contact-3"></div>
            </div>
            <div class="urgency-D" id="urgencyD">
              <img src="assets/img/prio-low.svg" alt="">
            </div>
        </div>
    `;
  }

}

function openTask() {
  document.getElementById('popUpContainer').innerHTML = ``;
}
