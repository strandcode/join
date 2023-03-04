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
    "email": "herta.schmidtkhjkjhkjhlkhjhkjhkjhkhj@example.dfgfdggfdgdfgdfgdfgdfgdfgfdgdfgdfgdfgdfgdfgdf.com",
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

const contactsRegister = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


function renderContactsList() {
  let contactsListS = document.getElementById('contactsListS');
  contactsListS.innerHTML = '';

  for (let r = 0; r < contactsRegister.length; r++) {

    contactsListS.innerHTML += `
    <div class="contacts-list-alphabet-char-S">${contactsRegister[r]}</div>
    `;

    for (let c = 0; c < contacts.length; c++) {
      if (contacts[c].firstName.charAt(0).toUpperCase() == contactsRegister[r].toUpperCase()) {
        contactsListS.innerHTML += templateContactsListContact(c);
      }
    }
  }
}

function templateContactsListContact(c) {
  let [email_name, email_domain] = contacts[c].email.split('@');
  console.log(email_name + '@' + email_domain);

  return /*html*/  `
    <div class="contacts-list-contact-wrapper-S" onclick="templateContactsActiveContact(${c})">
      <div class="contacts-list-contact-avatar" style="background-color: ${contacts[c].avatar_bg_color}">${contacts[c].avatar_initials}</div>
      <div class="contact-data-wrapper-S">
        <div class="contact-name-S">${contacts[c].firstName} ${contacts[c].lastName}</div>
        <a href="mailto:${contacts[c].email}" class="contacts-list-contact-email">
          <span>${email_name}</span>
          <span>@${email_domain}</span>
        </a>
      </div>
    </div>
  `;
}


function templateContactsActiveContact(activeContact) {
  let contactsMainHeader = document.getElementById('contactsMainHeader');
  contactsMainHeader.innerHTML = '';
  contactsMainHeader.innerHTML = /*html*/ `
    <div class="contacts-active-contact-wrapper-S">
      <div class="contacts-active-contact-avatar-S icon-size-120 font-size-48 bg-pink contacts-avatar-shadow" style="background-color: ${contacts[activeContact].avatar_bg_color}">
      ${contacts[activeContact].avatar_initials}
      </div>
      <div class="contact-data-wrapper-S">
        <div class="contact-name-S font-size-48">
          ${contacts[activeContact].firstName} ${contacts[activeContact].lastName}
        </div>
        <a href="#" class="contact-email-S">
          + Add Task
        </a>
      </div>
    </div>
  `;

  let contactsMainBody = document.getElementById('contactsMainBody');
  contactsMainBody.innerHTML = '';
  contactsMainBody.innerHTML = `
    <div class="contact-email-S">
      <span class="font-weight-700">Email</span>
      <a href="mailto:${contacts[activeContact].email}" class="contact-email-S break-all">${contacts[activeContact].email}</a>
    </div>
    <div class="contact-phone-S">
      <span class="font-weight-700">Phone</span>
      <a href="tel:${contacts[activeContact].phone}" class="contact-email-S break-all">${contacts[activeContact].phone}</a>
    </div>
  `;
}


renderContactsList();
templateContactsActiveContact(1);