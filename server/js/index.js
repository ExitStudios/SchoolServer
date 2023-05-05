let userLink = document.getElementById("profileLink");
let logoutLink = document.getElementById("signout-btn");
// TODO: Make SignOutLink and functions in profile.html JS-File
var currentUser = null;

function getUsername() {
  let stayLoggedIn = localStorage.getItem("stayLoggedIn");

  if (stayLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("stayLoggedIn");
  localStorage.removeItem("user");
  window.location = "login.html";
}

function convertToUtf8(str) {
  str = str.replace(/_/g, " ");

  str = str.replace(/ae/g, "ä");
  str = str.replace(/oe/g, "ö");
  str = str.replace(/ue/g, "ü");

  let words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() +
      words[i].slice(1).toLowerCase();
  }

  return words.join(" ");
}

window.onload = () => {
  getUsername();

  if (currentUser == null) {
    userLink.innerText = "Anmelden";
    userLink.href = "login.html";

    logoutLink.innerText = "Login";
    logoutLink.addEventListener("click", () => {
      window.location = "login.html";
    });
  } else {
    userLink.innerText = convertToUtf8(currentUser.name);
    userLink.href = "profile.html";

    logoutLink.innerText = "Logout";
    logoutLink.addEventListener("click", () => {
      logout();
    });
  }
};
