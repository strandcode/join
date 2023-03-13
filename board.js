let priority = ["assets/img/prio-low.svg", "assets/img/prio-medium.svg", "assets/img/prio-urgent.svg"];

let allTasks = [
  {
    "title": "Website redesign",
    "description": "Modify the contents of the main website",
    "label": "Design",
    "assigned to": "",
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



function generateTasks() {
  card = document.getElementById('workSteps1');
  for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    card.innerHTML += ``;
    card.innerHTML += `
        <div onclick="openTask(${i})" class="work-task-D" id="work-task-D-${i}">
                <div class="work-category-D ${task['label']}">${task['label']}</div>
                <div class="work-task-headline-D">${task['title']}</div>
                <div class="work-task-content-D">${task['description']}</div>   
                <span><img src="assets/img/icon-progressbar.png" alt="">1/2 Done</span> 
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

function openTask(index) {
  document.getElementById('popUpTaskD').classList.remove('d-none');
  let task = allTasks[index];
  let popupContainer = document.getElementById('popUpTaskD');
  popupContainer.innerHTML = ``;
  popupContainer.innerHTML += `
      <div class="work-category-D" id="taskCategoryOverlayD">
      ${task['label']}
     </div>
      <div class="close-work-overlay-D">
        <button onclick="closeWorkTask()">x</button>
      </div>
      <div class="work-overlay-headline-D">${task['title']}</div>
        <span>${task['description']}</span>
      <div class="work-overlay-date-D">
        <b>Due date:</b> <span class="overlay-date-D" id="overlayDateD">${task['date']}</span>
      </div>
      <div class="priority-overlay-D">
        <b>Priority</b><img src="assets/img/priority-urgent.svg" alt="">
      </div>
      <div class="assigned-overlay-D">
        <b>Assigned To:</b>
        <div class="user-overlay-D">
        <span>${task['assigned to']}</span>  
      </div>
        <div class="pop-up-change-button">
          <button onclick="changePopUp()">
            <img src="assets/img/summary-pencil.svg" alt="">
          </button>
        </div>
      </div>
      </div>
      `;
}

function closeWorkTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
}

function changePopUp() {
  popUp2 = document.getElementById('popUpTaskD');
  popUp2.innerHTML = "";
  popUp2.innerHTML = `
        <div id="popUp2" class="pop-up-2">
          <div class="pop-up-2-title">
            Title
            <input placeholder="Enter a title">
          </div>
          <div class="pop-up-2-description">
             Description
             <input placeholder="Enter a Description">
          </div>
          <div class="pop-up-2-date">
            Due date
            <input type="date">
          </div>
          <div class="pop-up-2-prio">
            Prio
            <button onclick="urgent()">Urgent <img id="urgent_img" src="assets/img/prio-urgent.svg"></button>
            <button onclick="medium()">Medium<img id="medium_img" src="assets/img/prio-medium.svg"</button>
            <button onclick="low()">Low<img id="low_img" src="assets/img/prio-low.svg"></button>
          </div>
          <div class="pop-up-2-assigned">
            Assigned to
            <select>
              <option>Select contacts to assign</option>
              <option>Contact 1</option>
              <option>Contact 2</option>
              <option>Contact 3</option>
            </select>
          <button onclick="changeTask()">
            Ok<img src="assets/img/icon-check-dark.svg" alt="">
          </button>
          <div class="close-work-overlay-D">
            <button onclick="closeWorkTask()">x</button>
          </div>
        `;
}

function changeTask() {
  document.getElementById('popUpTaskD').classList.add('d-none');
}