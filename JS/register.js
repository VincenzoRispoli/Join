let users = [];
let currentUser = []
let Name = []

async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}


async function register() {
  let Name = document.getElementById('name');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let register_button = document.getElementById('register_button');
  register_button.disabled = true;
  users.push({
    name: Name.value,
    email: email.value,
    password: password.value,
  });
  await setItem('users', JSON.stringify(users));
  resetForm();
  signUpMessage();
  redirectToLogin();
}

/**
 * Resets the form after registration.
 */
function resetForm() {     
  let Name = document.getElementById('name');
  Name.value = '';
  email.value = '';
  password.value = '';
  confirm_password.value = '';
  register_button.disabled = false;
}

/**
 * Checks if the passwords are matching at the registration.
 */
function match() {      
  var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirm_password");
  function validatePassword() {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}


async function login() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let user = users.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    await setItem('user', JSON.stringify(user));
    window.location.href = '/index.html';
  } else {
    loginError();
  }
}

/**
 * Empties the arrays related to the current user, and redirects to the login page.
 */
function logOut() {  
  Name = [];
  currentUser = [];
  deleteUser();
  window.location.href = '/landingpage.html';
}

/**
 * Sets the current user after log in.
 */
async function setCurrentUser() {   
  const userData = await getItem('user');
  let message = document.getElementById('welcome-message');
  try {
    const jsonUserData = JSON.parse(userData);
    currentUser.push(jsonUserData);
    message.innerHTML = currentUser[0]['name'];
    capitalisedName();
  } catch (error) {
    console.error("Es ist ein fehler aufgetreten.", error);
  }
}

async function setCurrentUserName() { 
  const userData = await getItem('user');
  try {
    const jsonUserData = JSON.parse(userData);
    currentUser.push(jsonUserData);
    capitalisedName();
  } catch (error) {
    console.error("Es ist ein fehler aufgetreten.", error);
  }
}

/**
 * Filters out the name of the User.
 */
function getNamefromArray() {
  let message = document.getElementById('welcome-message');
  message.innerHTML = currentUser[0]['name'];
}

/**
 * Capitalises the first letters of the signed in user, and shows them on the user-button.
 */
function capitalisedName() {    
  let capitalisedName = document.getElementById('user-name-capitalized');
  Name.push(currentUser[0]['name']);
  parts = Name[0].split(" ");
  neededStr = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  capitalisedName.innerHTML = neededStr
}

/**
 * Shows an error-message in case of wrong username or password.
 */
function loginError() {       
  let message = document.getElementById('login-error-message');
  message.classList.remove('d-none');
  message.classList.add('d-flex');

}

/**
 * The function behind the "Remember me" checkbox.
 */
function rememberMe() {   
  var rememberMeCheckbox = document.getElementById('remember');
  var usernameInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  if (localStorage.chkbx && localStorage.chkbx !== '') {
    rememberMeCheckbox.checked = true;
    usernameInput.value = localStorage.usrname;
    passwordInput.value = localStorage.pass;
  } else {
    rememberMeCheckbox.checked = false;
    usernameInput.value = '';
    passwordInput.value = '';
  }
  rememberMeCheckbox.addEventListener('click', function () {
    if (rememberMeCheckbox.checked) {
      localStorage.usrname = usernameInput.value;
      localStorage.pass = passwordInput.value;
      localStorage.chkbx = rememberMeCheckbox.checked;
    } else {
      localStorage.usrname = '';
      localStorage.pass = '';
      localStorage.chkbx = '';
    }
  });
};
