/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// JavaScript by Brandon Rowe

const studentList = document.querySelectorAll("li");
const perPage = 10;
const page = document.querySelector("div");
const paginationContainer = document.createElement("div");
paginationContainer.className = "pagination";
page.appendChild(paginationContainer);
const noResultsContainer = document.createElement("div");
page.appendChild(noResultsContainer);
/*** 
  Displays a desginated page of students with email and photo.
***/
const showPage = (list, page) => {
  const startIndex = page * perPage - perPage;
  const endIndex = page * perPage - 1;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/*** 
   Creates corresponding pages links to allow the user to switch between pages of student lists.
***/
const appendPageLinks = (list) => {
  const numPages = Math.ceil(list.length / perPage);
  const paginationList = document.createElement("ul");
  paginationContainer.appendChild(paginationList);

  for (let i = 1; i <= numPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    paginationList.appendChild(li);
    li.appendChild(a);
    a.href = "#";
    a.textContent = i;
    a.addEventListener("click", (event) => {
      showPage(list, i);
      document.querySelector(`.active`).classList.remove("active");
      const eventTarget = event.target;
      eventTarget.classList.add("active");
    });
  }
};
/*** 
   Displays search results when user search with string value. 
***/
function search(searchInput) {
  const nameSearched = searchInput.value;
  console.log(nameSearched);
  const studentNames = document.querySelectorAll("h3");
  const matchStudentList = [];
  paginationContainer.innerHTML = "";
  for (let i = 0; i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
  for (let i = 0; i < studentNames.length; i++) {
    if (
      studentNames[i].textContent
        .toLowerCase()
        .includes(nameSearched.toLowerCase())
    ) {
      const studentInfoList = studentNames[i].parentNode.parentNode;
      matchStudentList.push(studentInfoList);
    }
  }
  if (matchStudentList.length > 0) {
    showPage(matchStudentList, 1);
    appendPageLinks(matchStudentList);
    document.querySelector("a").classList = "active";
    noResultsContainer.innerHTML = ``;
    paginationContainer.style.display = ``;
  } else {
    noResultsContainer.innerHTML = "<p>No results.</p>";
    paginationContainer.style.display = "none";
  }
}
/*** 
 Creates seachbar in which the user can search for specific students by name.
***/
const searchBar = () => {
  const searchBarContainer = document.createElement("div");
  searchBarContainer.classList.add("student-search");
  const pageHeader = document.querySelector(".page-header");
  pageHeader.appendChild(searchBarContainer);
  const searchInput = document.createElement("input");
  searchBarContainer.appendChild(searchInput);
  searchInput.placeholder = "Search for students...";
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchBarContainer.appendChild(searchButton);

  searchButton.addEventListener("click", () => search(searchInput));

  searchInput.addEventListener("keyup", () => search(searchInput));
};
showPage(studentList, 1);
appendPageLinks(studentList);
searchBar();
document.querySelector("a").classList = "active";
