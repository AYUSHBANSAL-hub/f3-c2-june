//check access token

function checkAccessToken() {
  return localStorage.getItem("accessToken");
}

//toggle sections

function ToggleSections() {
  const signupPage = document.getElementsByClassName("container")[0];
  const profilePage = document.getElementById("profile-page");
  const isAccessTokenAvailable = checkAccessToken();

  signupPage.style.display = isAccessTokenAvailable ? "none" : "block";
  profilePage.style.display = isAccessTokenAvailable ? "block" : "none";

  document.getElementsByClassName("header-right")[0].innerHTML=isAccessTokenAvailable?`<p>Profile</p>`:`<p>Sign Up</p>`
//made some changes
  if (isAccessTokenAvailable) {
    displayProfileDetails();
  }
}

//saveuserState()

function saveUserState(user) {
  const accessToken = genererateAccessToken();
  user.accessToken = accessToken;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
}

//generate access token

function genererateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 16;
  let accessToken = "";

  for (let i = 0; i < tokenLength; i++) {
    accessToken += characters.charAt(Math.floor(Math.random() * tokenLength));
  }
  return accessToken;
}

//getuserstate to get the data from the LS

function getuserstate() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

//Clear user data from LS

function clearUserState() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}

// Show data in profile section
function displayProfileDetails() {
  const user = getuserstate();

  document.getElementById("profile-fullname").textContent = user.fullname;
  document.getElementById("profile-email").textContent = user.email;
  document.getElementById("profile-password").textContent = user.password;
}

//validate and parent function
document.getElementById("signup-button").addEventListener("click", function () {
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const errorElement = document.getElementById("signup-error");
  const successElement = document.getElementById("signup-success");

  if (fullname && email && password && confirmPassword) {
    if (password === confirmPassword) {
      const user = { fullname, email, password };
      saveUserState(user);
      errorElement.textContent = "";
      successElement.textContent = "Successfully Signed Up!";
      setTimeout(ToggleSections, 2000);
      
    } else {
      errorElement.textContent = "Password mismatch";
      successElement.textContent = "";
    }
  } else {
    errorElement.textContent = "ERROR: All fields are mandatory.";
    successElement.textContent = "";
  }
});

//logout listener
document.getElementById("logout-button").addEventListener("click", function () {
  clearUserState();
  ToggleSections();
  const fullname = document.getElementById("fullname").value="";
  const email = document.getElementById("email").value="";
  const password = document.getElementById("password").value="";
  const confirmPassword = document.getElementById("confirm-password").value="";
});

//load Event Listener
window.addEventListener("load", ToggleSections);
