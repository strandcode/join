function addContactToUser() {
  let contactAddFirstName = document.getElementById('contactAddFirstName');
  let contactAddLastName = document.getElementById('contactAddLastName');
  let contactAddEmail = document.getElementById('contactAddEmail');
  let contactAddPhone = document.getElementById('contactAddPhone');
  let newContact = {
    firstName: contactAddFirstName.value,
    lastName: contactAddLastName.value,
    email: contactAddEmail.value,
    phone: contactAddPhone.value,
    avatar_initials: contactAddFirstName.value.charAt(0).toUpperCase() + contactAddLastName.value.charAt(0).toUpperCase(),
    avatar_bg_color: addRandomColorToContactAvatar()
  }
  userData[4].contacts.push(newContact);
  saveToBackend()
}

function editContactOfUser(c) {
  let contactEditFirstName = document.getElementById('contactEditFirstName');
  let contactEditLastName = document.getElementById('contactEditLastName');
  let contactEditEmail = document.getElementById('contactEditEmail');
  let contactEditPhone = document.getElementById('contactEditPhone');
  let editedContact = {
    firstName: contactEditFirstName.value,
    lastName: contactEditLastName.value,
    email: contactEditEmail.value,
    phone: contactEditPhone.value,
    avatar_initials: contactEditFirstName.value.charAt(0).toUpperCase() + contactEditLastName.value.charAt(0).toUpperCase(),
    avatar_bg_color: addRandomColorToContactAvatar()
  }
  userData[4].contacts.splice(c, 1, editedContact);
  saveToBackend()
}



function addRandomColorToContactAvatar() {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  console.log(randomIndex);
  let avatar_bg_color = avatarColors[randomIndex];
  return avatar_bg_color;
}



function renderContactsList() {
  let contactsListS = document.getElementById('contactsListS');
  contactsListS.innerHTML = '';

  let contactsRegister = [];

  // TODO Habe ich noch nicht verstanden, gibt es da was leichteres?
  userData[4].contacts.sort(function (a, b) {
    var nameA = a.firstName.toUpperCase(); // Großbuchstaben verwenden, um die Sortierung zu vereinfachen
    var nameB = b.firstName.toUpperCase(); // dito
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // Namen sind gleich
    return 0;
  });

  for (let c = 0; c < userData[4].contacts.length; c++) {
    let firstLetter = userData[4].contacts[c].firstName.charAt(0).toUpperCase();
    if (!contactsRegister.includes(firstLetter)) {
      contactsRegister.push(firstLetter);

      contactsListS.innerHTML += `
        <div class="contacts-list-alphabet-char-S">${firstLetter}</div>
      `;

      for (let i = c; i < userData[4].contacts.length; i++) {
        if (userData[4].contacts[i].firstName.charAt(0).toUpperCase() == firstLetter) {
          contactsListS.innerHTML += templateContactsListContact(i);
        }
      }
    }
  }
}

function templateContactsListContact(c) {
  let [email_name, email_domain] = userData[4].contacts[c].email.split('@');
  return /*html*/  `
    <div class="contacts-list-contact-wrapper-S" onclick="templateContactsActiveContact(${c})">
      <div class="contacts-list-contact-avatar" style="background-color: ${userData[4].contacts[c].avatar_bg_color}">${userData[4].contacts[c].avatar_initials}</div>
      <div class="contact-data-wrapper-S">
        <div class="contact-name-S">${userData[4].contacts[c].firstName} ${userData[4].contacts[c].lastName}</div>
        <a href="mailto:${userData[4].contacts[c].email}" class="contacts-list-contact-email">
          <span>${email_name}</span>
          <span>@${email_domain}</span>
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
            style="background-color: ${userData[4].contacts[activeContact].avatar_bg_color}">
            ${userData[4].contacts[activeContact].avatar_initials}
          </div>
          <div class="contact-data-wrapper-S">
            <div class="contact-name-S font-size-48">
              ${userData[4].contacts[activeContact].firstName} ${userData[4].contacts[activeContact].lastName}
            </div>
            <a href="#" class="contact-email-S">+ Add Task</a>
          </div>
        </div>
      </div>
      <div class="contacts-list-main-edit-S">
        <h4>Contact Information</h4>
        <div class="contacts-active-contact-edit" onclick="showOverlay('editContactOverlay', 'editContactContainer')">
          <img src="assets/img/pencil-no-bg.svg" alt="">
          <span>Edit Contact</span>
        </div>
      </div>
      <div id="contactsMainBody" class="contacts-list-main-data"></div>
    `;

  let contactsMainBody = document.getElementById('contactsMainBody');
  contactsMainBody.innerHTML = '';
  contactsMainBody.innerHTML = `
    <div class="contact-email-S">
      <span class="font-weight-700">Email</span>
      <a href="mailto:${userData[4].contacts[activeContact].email}" class="contact-email-S break-all">${userData[4].contacts[activeContact].email}</a>
    </div>
    <div class="contact-phone-S">
      <span class="font-weight-700">Phone</span>
      <a href="tel:${userData[4].contacts[activeContact].phone}" class="contact-email-S break-all">${userData[4].contacts[activeContact].phone}</a>
    </div>
  `;
  templateEditContactActiveContact(activeContact);
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

function templateEditContactActiveContact(c) {
  let contactOverlayActiveContact = document.getElementById('contactFormActiveContact');
  contactOverlayActiveContact.innerHTML = '';
  contactOverlayActiveContact.innerHTML += /*html*/ `
    <div class="contact-overlay-right-avatar" 
         style="background-color: ${userData[4].contacts[c].avatar_bg_color}">${userData[4].contacts[c].avatar_initials}
    </div>
    <div class="contact-overlay-right-input">

      <input id="contactEditFirstName" name="contactEditFirstName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Firstname" value="${userData[4].contacts[c].firstName}" required>
      <input id="contactEditLastName" name="contactEditLastName" type="text" 
        class="contact-overlay-right-input-name" placeholder="Lastname" value="${userData[4].contacts[c].lastName}" required>

      <input id="contactEditEmail" name="contactEditEmail" type="email" value="${userData[4].contacts[c].email}" 
      class="contact-overlay-right-input-email" placeholder="Email">
      
      <input id="contactEditPhone" name="contactEditPhone" type="tel" value="${userData[4].contacts[c].phone}" 
      class="contact-overlay-right-input-phone" placeholder="Phone">
     
      <div class="contact-overlay-right-footer">
        <button class="contact-overlay-button" onclick="editContactOfUser(${c}); closeOverlay('editContactOverlay', 'editContactContainer')">Save</button>
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
    <form onsubmit="addContactToUser(); return false;">
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
          <button class="contact-overlay-button" onclick="addContactToUser(); closeOverlay('addContactOverlay', 'addContactContainer')">Save</button>
        </div>
      </div>
    </form>
  `;
}

templateAddContactForm();
// renderContactsList();
// templateContactsActiveContact(0);


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




// TODO wenn die Daten gefüllt sind, kann es entfernt werden

function writeContactsToUser() {
  for (let i = 0; i < contacts.length; i++) {
    let newContact = {
      firstName: contacts[i].firstName,
      lastName: contacts[i].lastName,
      email: contacts[i].email,
      phone: contacts[i].phone,
      avatar_initials: contacts[i].avatar_initials,
      avatar_bg_color: contacts[i].avatar_bg_color
    };
    userData[4].contacts.push(newContact);
  }
  backend.setItem('users', JSON.stringify(userData)).then(() => {
    loadUsers();
  });
}


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
