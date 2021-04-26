"use strict";

// select items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// functions
const addItem = e => {
	e.preventDefault();
	const value = grocery.value;
	const id = new Date().getTime().toString();
	if (value && !editFlag) {

	} else if (value && editFlag) {

	} else {
		displayAlert("please, enter value", "danger")
	}
}

const displayAlert = (text, action) => {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);

	// remove alert
	setTimeout(() => {
		alert.textContent = "";
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}
// addEventListener
form.addEventListener("submit", addItem);