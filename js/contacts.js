async function initContacts() {
  try {
    userData = JSON.parse(await getItem('userData'));
  } catch (e) {
    console.error('Loading error:', e);
  }
  initHeader();
  initNavbar();
  initBoardData();
}


function initBoardData() {
  setNavbarItemActive('.navbar-contacts');
  if (userData[currentUser].contacts.length > 0) {
    renderContactsList();
  } else {
    console.warn('No contacts found');
    templatefirstContact();
  }

}



const contactsListS = document.getElementById('contactsList');
const contactsMainWrapperS = document.getElementById('contactsMainWrapperS');
const contactFooterWrapper = document.getElementById('contactFooterWrapper');


function templatefirstContact() {
  contactFooterWrapper.innerHTML = '';
  contactsMainWrapperS.innerHTML = '';
  contactsListS.classList.add('d-none');
  contactsListS.innerHTML = '';
  contactsMainWrapperS.innerHTML += /*html*/ `
    <div class="first-contact">
      <button class="button button-darkblue"
        onclick="showOverlay('addContactOverlay', 'addContactContainer'); templateAddContactForm()">
        New contact
        <img src="assets/img/icons-add-contact.svg" alt="Logo-add-contact">
      </button>
      <div class="arrow-line-animation">
      <img src="assets/img/arrow-left-line.svg" alt="">
      <div class="blue-line"></div>
      </div>
    </div>  
  `;
}

// NOTE Hier wird der zentrale Index c (IndexOf Contact in contacts) generiert
function renderContactsList() {
  contactsListS.classList.remove('d-none');
  sortUserContactsAlphabetically();
  let contactsRegister = [];
  contactsList.innerHTML = '';
  for (let c = 0; c < userData[currentUser].contacts.length; c++) {
    let firstLetter = userData[currentUser].contacts[c].firstName.charAt(0).toUpperCase();
    if (!contactsRegister.includes(firstLetter)) {
      contactsRegister.push(firstLetter);
      contactsList.innerHTML += templateContactsRegister(firstLetter);
      for (let i = c; i < userData[currentUser].contacts.length; i++) {
        if (userData[currentUser].contacts[i].firstName.charAt(0).toUpperCase() == firstLetter) {
          contactsList.innerHTML += templateContactsListContact(i);
        }
      }
    }
  }
  templateContactsActiveContact(0);
}



// LINK https://www.w3schools.com/jsref/jsref_sort.asp
function sortUserContactsAlphabetically() {
  userData[currentUser].contacts.sort(function (a, b) {
    let nameA = a.firstName.toUpperCase();
    let nameB = b.firstName.toUpperCase();
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;   // Wenn Anfangsbuchstaben gleich sind
  });
}

function templateContactsRegister(firstLetter) {
  return /*html*/ `
    <div class="contacts-list-alphabet-char-S">${firstLetter}</div>
  `;
}


function templateContactsListContact(c) {
  let [email_name, email_domain] = userData[currentUser].contacts[c].email.split('@');
  return /*html*/  `
    <div class="contacts-list-contact-wrapper-S" onclick="templateContactsActiveContact(${c})">
      <div class="contacts-list-contact-avatar" style="background-color: ${userData[currentUser].contacts[c].avatar_bg_color}">${userData[currentUser].contacts[c].avatar_initials}</div>
      <div class="contact-data-wrapper-S">
        <div class="contact-name-S">${userData[currentUser].contacts[c].firstName} ${userData[currentUser].contacts[c].lastName}</div>
        <a href="mailto:${userData[currentUser].contacts[c].email}" class="contacts-list-contact-email">
          <span>${email_name}</span>
          <span>@${email_domain}</span>
        </a>
        <a href="mailto:${userData[currentUser].contacts[c].phone}" class="contacts-list-contact-phone">
          <span>${userData[currentUser].contacts[c].phone}</span>
        </a>
      </div>
    </div>
  `;
}


function templateContactsActiveContact(activeContact) {
  let contactsMainWrapperS = document.getElementById('contactsMainWrapperS');
  contactsMainWrapperS.innerHTML = '';
  contactsMainWrapperS.innerHTML = /*html*/ `
    <div id="contactsMainHeader" class="contacts-main-header">
        <div class="contacts-active-contact-wrapper-S">
          <div class="contacts-active-contact-avatar-S icon-size-120 font-size-48 bg-pink contacts-avatar-shadow"
            style="background-color: ${userData[currentUser].contacts[activeContact].avatar_bg_color}">
            ${userData[currentUser].contacts[activeContact].avatar_initials}
          </div>
          <div class="contact-data-wrapper-S">
            <div class="contact-name-S font-size-48">
              ${userData[currentUser].contacts[activeContact].firstName} ${userData[currentUser].contacts[activeContact].lastName}
            </div>
            <a href="#" class="contact-email-S">+ Add Task</a>
          </div>
        </div>
      </div>
      <div class="contacts-list-main-edit-S">
        <h4>Contact Information</h4>
        <button class="button button-darkblue" onclick="showOverlay('editContactOverlay', 'editContactContainer')">
          Edit Contact
        </button>
        <!-- TODO Richtiges design?
         <div class="contacts-active-contact-edit" onclick="showOverlay('editContactOverlay', 'editContactContainer')">
          <img src="assets/img/pencil-no-bg.svg" alt="">
          <span>Edit Contact</span>
        </div> -->


      



      </div>
      <div id="contactsMainBody" class="contacts-list-main-data"></div>
    `;

  let contactsMainBody = document.getElementById('contactsMainBody');
  contactsMainBody.innerHTML = '';
  contactsMainBody.innerHTML = `
    <div class="contact-email-S">
      <span class="font-weight-700">Email</span>
      <a href="mailto:${userData[currentUser].contacts[activeContact].email}" class="contact-email-S break-all">${userData[currentUser].contacts[activeContact].email}</a>
    </div>
    <div class="contact-phone-S">
      <span class="font-weight-700">Phone</span>
      <a href="tel:${userData[currentUser].contacts[activeContact].phone}" class="contact-email-S break-all">${userData[currentUser].contacts[activeContact].phone}</a>
    </div>
  `;
  templateEditContactActiveContact(activeContact);
  templateContactFooterWrapper(activeContact);
}

function templateContactFooterWrapper(activeContact) {
  const contactsFooterWrapper = document.getElementById('contactFooterWrapper');
  contactsFooterWrapper.innerHTML = '';
  contactsFooterWrapper.innerHTML += /*html*/ `
    <button class="button button-darkblue"
      onclick="showOverlay('addContactOverlay', 'addContactContainer'); templateAddContactForm()">
      New contact
      <img src="assets/img/icons-add-contact.svg" alt="Logo-add-contact">
    </button>
    <button class="button button-white" onclick="deleteContactOfUser(${activeContact})">
      Delete Contact
    </button>
  `;
}



function showOverlay(overlayId, overlayContainerId) {
  document.getElementById(overlayId).classList.remove('d-none');
  document.getElementById(overlayId).classList.add('fade-to-gray-overlay');
  document.getElementById(overlayContainerId).classList.add('desktop-slide-in');
}

function closeOverlay(overlayId, overlayContainerId) {
  document.getElementById(overlayContainerId).classList.remove('desktop-slide-in');
  document.getElementById(overlayContainerId).classList.add('desktop-slide-out');
  document.getElementById(overlayId).classList.add('fade-out-gray-overlay');
  setTimeout(function () {
    document.getElementById(overlayId).classList.add('d-none');
    document.getElementById(overlayId).classList.remove('fade-to-gray-overlay', 'fade-out-gray-overlay');
    document.getElementById(overlayContainerId).classList.remove('desktop-slide-out');
  }, 240);
}


async function addContactToUser() {
  const contactAddFirstName = document.getElementById('contactAddFirstName');
  const contactAddLastName = document.getElementById('contactAddLastName');
  const contactAddEmail = document.getElementById('contactAddEmail');
  const contactAddPhone = document.getElementById('contactAddPhone');
  let newContact = {
    contactID: new Date().getTime(),
    firstName: contactAddFirstName.value,
    lastName: contactAddLastName.value,
    email: contactAddEmail.value,
    phone: contactAddPhone.value,
    avatar_initials: contactAddFirstName.value.charAt(0).toUpperCase() + contactAddLastName.value.charAt(0).toUpperCase(),
    avatar_bg_color: addRandomColorToContactAvatar()
  }
  userData[currentUser].contacts.push(newContact);
  await saveToStorage();
  initContacts();
}

async function editContactOfUser(c) {
  const contactEditFirstName = document.getElementById('contactEditFirstName');
  const contactEditLastName = document.getElementById('contactEditLastName');
  const contactEditEmail = document.getElementById('contactEditEmail');
  const contactEditPhone = document.getElementById('contactEditPhone');
  let editedContact = {
    contactID: userData[currentUser].contacts[c].contactID,
    firstName: contactEditFirstName.value,
    lastName: contactEditLastName.value,
    email: contactEditEmail.value,
    phone: contactEditPhone.value,
    avatar_initials: contactEditFirstName.value.charAt(0).toUpperCase() + contactEditLastName.value.charAt(0).toUpperCase(),
    avatar_bg_color: addRandomColorToContactAvatar()
  }
  userData[currentUser].contacts.splice(c, 1, editedContact);
  await saveToStorage();
  initContacts();
}

async function deleteContactOfUser(c) {
  userData[currentUser].contacts.splice(c, 1);
  await saveToStorage();
  initContacts();
}


function addRandomColorToContactAvatar() {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  let avatar_bg_color = avatarColors[randomIndex];
  return avatar_bg_color;
}


function templateEditContactActiveContact(c) {
  const contactOverlayActiveContact = document.getElementById('contactFormActiveContact');
  contactOverlayActiveContact.innerHTML = '';
  contactOverlayActiveContact.innerHTML += /*html*/ `
    <div class="contact-overlay-right-avatar" 
         style="background-color: ${userData[currentUser].contacts[c].avatar_bg_color}">${userData[currentUser].contacts[c].avatar_initials}
    </div>
    <div class="contact-overlay-right-input">

      <input id="contactEditFirstName" name="contactEditFirstName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Firstname" value="${userData[currentUser].contacts[c].firstName}" required>
      <input id="contactEditLastName" name="contactEditLastName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Lastname" value="${userData[currentUser].contacts[c].lastName}" required>

      <input id="contactEditEmail" name="contactEditEmail" type="email" value="${userData[currentUser].contacts[c].email}" 
      class="contact-overlay-right-input-email" placeholder="Email">
      
      <input id="contactEditPhone" name="contactEditPhone" type="tel" value="${userData[currentUser].contacts[c].phone}" 
      class="contact-overlay-right-input-phone" placeholder="Phone">
     
      <div class="contact-overlay-right-footer">
        <button class="button button-darkblue" onclick="editContactOfUser(${c}); closeOverlay('editContactOverlay', 'editContactContainer')">Save</button>
      </div>
    </div>
  `;
}


function templateAddContactForm() {
  let contactFormNewContact = document.getElementById('contactFormNewContact');
  contactFormNewContact.innerHTML = '';
  contactFormNewContact.innerHTML += /*html*/ `
    <div class="contact-overlay-right-avatar" 
         style="background-color: gray">NN
    </div>
    <form onsubmit="addContactToUser(); closeOverlay('addContactOverlay', 'addContactContainer'); return false;">
      <div class="contact-overlay-right-input">
        <input id="contactAddFirstName" name="contactEditName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Firstname" required>

        <input id="contactAddLastName" name="contactEditName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Lastname" required>
        
        <input id="contactAddEmail" name="contactEditEmail" type="email" 
        class="contact-overlay-right-input-email" placeholder="Email" required>
        
        <input id="contactAddPhone" name="contactEditPhone" type="tel" 
        class="contact-overlay-right-input-phone" placeholder="Phone" required>
        
        <div class="contact-overlay-right-footer">
          <button class="button button-darkblue">Save</button>
        </div>
      </div>
    </form>
  `;
}


const avatarColors = [
  "#FF7A00", // orange
  "#9327FF", // purple
  "#29ABE2", // turquoise
  "#FC71FF", // pink
  "#02CF2F", // green
  "#AF1616", // darkred
  "#462F8A", // darkpurple
  "#007CEE", // blue
];





var contacts = [
  {
    "firstName": "Alex",
    "lastName": "Müller",
    "email": "alex.mueller@example.com",
    "phone": "+49 123 56789",
    "avatar_initials": "AM",
    "avatar_bg_color": "#1abc9c"
  },
  {
    "firstName": "Herta-Emilia-Victoria",
    "lastName": "Schmidt",
    "email": "herta.schmidt@example.com",
    "phone": "+49 123 45678",
    "avatar_initials": "BS",
    "avatar_bg_color": "#2ecc71"
  },
  {
    "firstName": "Christian",
    "lastName": "Fischer",
    "email": "christian.fischer@example.com",
    "phone": "+49 123 23456",
    "avatar_initials": "CF",
    "avatar_bg_color": "#3498db"
  },
  {
    "firstName": "David",
    "lastName": "Weber",
    "email": "david.weber@example.com",
    "phone": "+49 123 78901",
    "avatar_initials": "DW",
    "avatar_bg_color": "#9b59b6"
  },
  {
    "firstName": "Emma",
    "lastName": "Wagner",
    "email": "emma.wagner@example.com",
    "phone": "+49 123 12345",
    "avatar_initials": "EW",
    "avatar_bg_color": "#34495e"
  },
  {
    "firstName": "Felix",
    "lastName": "Bauer",
    "email": "felix.bauer@example.com",
    "phone": "+49 123 89012",
    "avatar_initials": "FB",
    "avatar_bg_color": "#f1c40f"
  },
  {
    "firstName": "Greta",
    "lastName": "Hoffmann",
    "email": "greta.hoffmann@example.com",
    "phone": "+49 123 45670",
    "avatar_initials": "GH",
    "avatar_bg_color": "#e67e22"
  },
  {
    "firstName": "Hans",
    "lastName": "Koch",
    "email": "hans.koch@example.com",
    "phone": "+49 123 12340",
    "avatar_initials": "HK",
    "avatar_bg_color": "#e74c3c"
  },
  {
    "firstName": "Isabella",
    "lastName": "Lehmann",
    "email": "isabella.lehmann@example.com",
    "phone": "+49 123 56780",
    "avatar_initials": "IL",
    "avatar_bg_color": "#95a5a6"
  },
  {
    "firstName": "Julia",
    "lastName": "Maier",
    "email": "julia.maier@example.com",
    "phone": "+49 123 23450",
    "avatar_initials": "JM",
    "avatar_bg_color": "#d35400"
  },
  {
    "firstName": "Karl",
    "lastName": "Neumann",
    "email": "karl.neumann@example.com",
    "phone": "+49 123 78900",
    "avatar_initials": "KN",
    "avatar_bg_color": "#7f8c8d"
  }
];
