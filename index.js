import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { projectId, databaseUrl } from "../config.js";

const appSettings = {
    projectId,
    databaseUrl
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);

    appendItemToShoppingListEl(inputValue);

    clearInputFieldEl();
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
