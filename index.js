import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        cleanShoppingListEl();

        for (let i = 0; i < itemsArray.length; i++) {
            let currentValue = itemsArray[i];
            let currentItemID = currentValue[0];
            let currentItemValue = currentValue[1];
            appendItemToShoppingListEl(currentValue);
        }
    }else{
        shoppingListEl.innerHTML = "No items here... yet";
    }


});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function cleanShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
    let newEl = document.createElement("li");
    let itemID = item[0];
    let itemValue = item[1];

    newEl.textContent = itemValue;

    shoppingListEl.append(newEl);

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })
}
