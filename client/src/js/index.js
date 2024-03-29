//import css files
import "../css/index.css";

//import bootstrap
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//import functions
import { initDb, postDb, deleteDb, editDb } from "./database";
import { toggleForm, clearForm } from "./form";
import { fetchCards } from "./cards";

//import images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

//on load functionality
window.addEventListener("load", function () {
  initDb();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating

    editDb(profileId, name, email, phone, profile);
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
  //get id from contact btn
  let id = parseInt(e.id);
  //delete card
  deleteDb(id);
  //reload DOM
  fetchCards();
};

window.editCard = (e) => {
  profileId = parseInt(e.dataset.id);

  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  submitBtnToUpdate = true;
};

// Checks to see if serviceWorker exists in the navigator and installs our service worker configurations
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(function (reg) {
      console.log("Successfully registered service worker", reg);
    })
    .catch(function (err) {
      console.warn("Error whilst registering service worker", err);
    });
}

//install btn
const installBtn = document.getElementById("installBtn");

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';

  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
});
