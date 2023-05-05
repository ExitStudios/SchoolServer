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

let msgDb = firebase.database().ref("schoolServerMessages");
let msg_form = document.getElementById("send-msg-form");

msg_form.addEventListener(
  "submit",
  submitMsgForm,
);

function submitMsgForm(e) {
  e.preventDefault();

  let sender_name = getElementVal("data-sender");
  let receiver_name = getElementVal("data-receiver");
  let msg_topic = getElementVal("topic");
  let msg_content = getElementVal("msg");

  uploadMsgsToDatabase(sender_name, receiver_name, msg_topic, msg_content);

  msg_form.reset();
}

const uploadMsgsToDatabase = (
  sender_name,
  receiver_name,
  msg_topic,
  msg_content,
) => {
  let newContactForm = msgDb.push();

  if (
    sender_name != "" && receiver_name != "" && msg_topic != "" &&
    msg_content != ""
  ) {
    newContactForm.set({
      sender_name: sender_name,
      receiver_name: receiver_name,
      msg_topic: msg_topic,
      msg_content: msg_content,
    });
  }
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
//TODO: Fix this
