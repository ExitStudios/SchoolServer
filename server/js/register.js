import {
  child,
  get,
  getDatabase,
  ref,
  set,
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
const databaseReference = ref(database);

let name = document.getElementById("register-name");
let email = document.getElementById("register-email");
let school = document.getElementById("register-school");
let password = document.getElementById("register-password");
let confirmPassword = document.getElementById("confirm-password");
let registerBtn = document.getElementById("register-btn");

function isEmptyOrHasSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function validate() {
  console.log(name.value);
  let nameRegex = /^[a-z_\s]+$/; //* name should be written with "_" and without "ä, ö, ü"
  let emailRegex = /^[a-zA-Z0-9aöüAÖÜß_]+@(gmail|yahoo|outlook)\.com$/;

  if (
    isEmptyOrHasSpaces(name.value) || isEmptyOrHasSpaces(email.value) ||
    isEmptyOrHasSpaces(password.value) ||
    isEmptyOrHasSpaces(confirmPassword.value) ||
    isEmptyOrHasSpaces(school.value)
  ) {
    alert(
      "Bitte fülle alle Felder aus. Benutze keine Leerzeichen außer beim Schul-Feld.",
    );
    return false;
  }

  if (!nameRegex.test(name.value)) {
    alert(
      "Bitte fülle das Name-Feld aus. Wenn dies der fall ist, prüfe, ob der Name nur kleine alphabetische Buchstaben hat und diesem Muster folgt: 'max_musterman'. Umlaute werden ausgeschrieben.",
    );
    // TODO: Make custom alert / error field
    return false;
  }

  if (!emailRegex.test(email.value)) {
    alert(
      "Bitte fülle das Email-Feld aus. Wenn dies der Fall ist, prüfe, on Email Adresse diese Anbieter hat: Gmail, Yahoo, Outlook. Wenn deine Email Adressenanbieter nicht erwähnt ist, melde dich beim Entwickler.",
    );
    // TODO: Make custom alert / error field
    return false;
  }

  if (password.value != confirmPassword.value) {
    alert("Die Passwörter stimmen nicht überein. Bitte überprüfe dies.");
    return false;
  }

  return true;
}

function registerUser() {
  if (!validate()) {
    return;
  }

  get(child(databaseReference, "Students/" + name.value)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        alert("Anmeldedaten ungültig. Bitte versuche es nochmal.");
      } else {
        set(ref(database, "Students/" + name.value), {
          name: name.value,
          email: email.value,
          school: school.value,
          password: encryptPassword(),
        }).then(() => {
          alert(
            "Anmeldung erfolgreich. Es wird eine Nachricht an einen Administratoren gesendet, dass du dich angemeldet hast.",
          );
          sendRegistrationRequestToAdmin(name.value, email.value, school.value); // TODO: Make Admin page, set notification who has registered
        }).catch((error) => {
          alert("Error:" + error);
        });
      }
    },
  );
}

function sendRegistrationRequestToAdmin(name, email, school) {
  get(child(databaseReference, "UNA/" + name)).then(
    //? UNA = User Notifications for Admins
    () => {
      set(ref(database, "UNA/System/UR/" + name), {
        //? UR = User Registrations
        name: name,
        email: email,
        school: school,
      }).catch((error) => {
        alert("Error:" + error);
      });
    },
  );
}

function encryptPassword() {
  var pass12 = CryptoJS.AES.encrypt(password.value, password.value);

  return pass12.toString();
}

registerBtn.addEventListener("click", () => {
  registerUser();
});
