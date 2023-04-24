let users = [];

async function init() {
  loadUsers();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error: ', e);
  }

}

async function register() {
  users.push({
    email: 'test@test.de',
    passowrd: 'test123'
  });
  await setItem('users', JSON.stringify(users));
}