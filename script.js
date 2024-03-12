/* Display data */
let jsonData = [];
let paginationSize = 20;
let paginationStart = 0;
let paginationEnd = paginationStart + paginationSize;
let totalPages = 0;
let currentPage = 1;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const pageNumber = document.getElementById("pagination-numbers");

async function fetchData() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
	const data = await response.json();
	jsonData = data;
	setData(jsonData);
}
fetchData();

function setData(data) {
	const parentDiv = document.getElementById("json");
	const lengthInfo = document.getElementById("h3");
	parentDiv.innerHTML = "";
	const list = document.createElement("ol");
	list.setAttribute("id", "paginated-list");
	parentDiv.appendChild(list);
	let paginatedData = data.slice(paginationStart, paginationEnd);
	paginatedData.forEach((element) => {
		const listItem = document.createElement("li");
		listItem.innerText =
			element.title +
			" --> " +
			(element.completed ? "completed" : "not completed");
		list.appendChild(listItem);
	});
	totalPages = jsonData.length / paginationSize;
	lengthInfo.innerText = `Displaying ${paginatedData.length} of ${jsonData.length} elements`;
	pageNumber.innerText = `page ${currentPage} / ${totalPages}`;
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

if (currentPage === 1) {
	prevButton.setAttribute("disabled", true);
}

function incrementPage() {
	if (currentPage < totalPages) {
		nextButton.removeAttribute("disabled");
	}

	paginationStart += paginationSize;
	paginationEnd += paginationSize;
	currentPage++;
	if (currentPage === totalPages) {
		nextButton.setAttribute("disabled", true);
	}

	if (currentPage > 1) {
		prevButton.removeAttribute("disabled");
	}
	setData(jsonData);
}

function decrementPage() {
	paginationStart -= paginationSize;
	paginationEnd -= paginationSize;
	currentPage--;
	if (currentPage < totalPages) {
		nextButton.removeAttribute("disabled");
	}
	if (currentPage === 1) {
		prevButton.setAttribute("disabled", true);
	}
	setData(jsonData);
}

nextButton.addEventListener("click", incrementPage);
prevButton.addEventListener("click", decrementPage);
//TODO:
/* search simplu si peurma paginatie simpla - si paginatie cu query  - search cu query*/
