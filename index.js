import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
    clearInputFieldEl();
});

onValue(shoppingListInDB, function (snapshot) {
    let itemsArray = Object.values(snapshot.val());

    cleanShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
        let currentValue = itemsArray[i];
        appendItemToShoppingListEl(currentValue);
    }
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function cleanShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
