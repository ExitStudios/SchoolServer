import {
  child,
  get,
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXLXJosIiOW_Cwq9uwr0cpT9ozMfX3Vng",
  authDomain: "school-server-10535.firebaseapp.com",
  databaseURL: "https://school-server-10535-default-rtdb.firebaseio.com",
  projectId: "school-server-10535",
  storageBucket: "school-server-10535.appspot.com",
  messagingSenderId: "995946247783",
  appId: "1:995946247783:web:ba0a0b7aaaa0df403ec6c2",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

let name = document.getElementById("login-name");
let password = document.getElementById("login-password");
let stayLoggedInSwitch = document.getElementById("custom-switch1");
let loginBtn = document.getElementById("login-btn");

function authUser() {
  const databaseReference = ref(database);

  get(child(databaseReference, "Students/" + name.value)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        let databasePassword = decryptPassword(snapshot.val().password);

        if (databasePassword == password.value) {
          login(snapshot.val());
          console.log(snapshot.val());
        } else {
          alert("Ungültige Anmeldedaten. Bitte versuche es nochmal.");
        }
      } else {
        alert("Ungültige Anmeldedaten. Bitte versuche es nochmal.");
      }
    },
  );
}

function decryptPassword(databasePassword) {
  var pass12 = CryptoJS.AES.decrypt(databasePassword, password.value);

  return pass12.toString(CryptoJS.enc.Utf8);
}

function login(user) {
  let stayLoggedIn = stayLoggedInSwitch.checked;

  if (!stayLoggedIn) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  } else {
    localStorage.setItem("stayLoggedIn", "yes");
    localStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  }
}

loginBtn.addEventListener("click", () => {
  authUser();
});
