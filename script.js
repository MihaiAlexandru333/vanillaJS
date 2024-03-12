/* Display data */
let jsonData = [];
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

async function fetchData() {
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
	const data = await response.json();
	jsonData = data;
	setData(data);
}
fetchData();

function setData(data) {
	const parentDiv = document.getElementById("json");
	const lengthInfo = document.getElementById("h3");
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
	lengthInfo.innerText = `Displaying ${data.length} elements`;
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

//TODO:
/* search simplu si peurma search cu paginatie - si paginatie cu query */
