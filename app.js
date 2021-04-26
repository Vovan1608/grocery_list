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
		const element = document.createElement("article");
		element.classList.add("grocery-item");

		const attr = document.createAttribute("data-id");
		attr.value = id;

		element.setAttributeNode(attr);
		element.innerHTML = `
			<p class="title">${value}</p>
			<div class="btn-container">
				<button class="edit-btn" type="button">
					<i class="fas fa-edit"></i>
				</button>
				<button class="delete-btn" type="button">
					<i class="fas fa-trash"></i>
				</button>
			</div>
		`;
		const deleteBtn = element.querySelector(".delete-btn");
		const editBtn = element.querySelector(".edit-btn");
		deleteBtn.addEventListener("click", deleteItem);
		editBtn.addEventListener("click", editItem);

		list.appendChild(element);
		displayAlert("item added to the list", "success");
		container.classList.add("show-container");

		addToLocalStorage(id, value);
		setBackToDefault();
	} else if (value && editFlag) {
		editElement.innerHTML = value;
		displayAlert("value edit", "success");
		// editLocalStorage(editID, value);
		setBackToDefault();
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

const addToLocalStorage = (id, value) => {
	const grocery = {id, value};
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem("list", JSON.stringify(items));
}

const removeFromLocalStorage = id => {}

const editLocalStorage = (id, value) => {

}

const getLocalStorage = () => {
	return localStorage.getItem("list") ?
	JSON.parse(localStorage.getItem("list")) : [];
}
// set back to empty string
const setBackToDefault = () => {
	grocery.value = "";
	editFlag = false;
	editID = "";
	submitBtn.textContent = "submit";
}

const clearItems = () => {
	const items = document.querySelectorAll(".grocery-item");
	if (items.length) {
		items.forEach(item => {
			list.removeChild(item);
		});
	}

	container.classList.remove("show-container");
	displayAlert("empty list", "danger");
	setBackToDefault();
}

const deleteItem = e => {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id
	list.removeChild(element);

	if (!list.children.length) {
		container.classList.remove("show-container");
	}

	displayAlert("item removed", "danger");
	setBackToDefault();
	removeFromLocalStorage(id)
}

const editItem = e => {
	const element = e.currentTarget.parentElement.parentElement;
	editElement = e.currentTarget.parentElement.previousElementSibling;
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = "edit";
}

// addEventListener
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);