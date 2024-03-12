/* Display data */
let jsonData = [];
let allData = [];
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageNumber = document.getElementById("pagination-numbers");
let page = 1;
let pageSize = 20;
let start = 0;
let limit = 20;
let totalPages = 0;

prevButton.addEventListener("click", prevHandler);
nextButton.addEventListener("click", nextHandler);

async function initialFetch() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
	const data = await response.json();
	allData = data;
}
initialFetch();

async function fetchData() {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`
	);
	const data = await response.json();
	jsonData = data;
	setData(data);
	totalPages = Math.ceil(allData.length / pageSize);
	pageNumber.innerHTML = `Page ${page} of ${totalPages}`;
}
fetchData();

function setData(data) {
	const parentDiv = document.getElementById("json");
	parentDiv.innerHTML = "";
	const list = document.createElement("ol");
	list.setAttribute("id", "paginated-list");
	parentDiv.appendChild(list);
	data.forEach((element) => {
		const listItem = document.createElement("li");
		listItem.innerText =
			element.title +
			" --> " +
			(element.completed ? "completed" : "not completed");
		list.appendChild(listItem);
	});
}

/* Search functionality */

const source = document.getElementById("search");
const submitBtn = document.getElementById("submit");

//as the user types
const inputHandeler = (e) => {
	let inputValue = "";
	inputValue = e.target.value;
	console.log(inputValue);
};

//when the user clicks the button
const submitHandeler = (e) => {
	let inputValue = "";
	inputValue = source.value;

	let filteredData = jsonData.filter((item) => {
		return item.title.includes(inputValue);
	});
	console.log(filteredData);
	setData(filteredData);
};

source.addEventListener("input", inputHandeler);
submitBtn.addEventListener("click", submitHandeler);

/* pagination query */
if (page === 1) prevButton.setAttribute("disabled", true);

function nextHandler() {
	page++;
	start += limit;
	if (page === totalPages) nextButton.setAttribute("disabled", true);
	if (page > 1) prevButton.removeAttribute("disabled");
	fetchData();
}

function prevHandler() {
	page--;
	start -= limit;
	if (page === 1) prevButton.setAttribute("disabled", true);
	if (nextButton.hasAttribute("disabled"))
		nextButton.removeAttribute("disabled");
	fetchData();
}
