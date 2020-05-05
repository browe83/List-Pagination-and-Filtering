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

/*** 
  Displays a desginated page of students with provided information.
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
   Creates corresponding pages links to allow the user to switch between pages of student information.
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
 Creates seachbar in which users can search for specific students by name.
***/
const searchStudents = () => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("student-search");
  const pageHeader = document.querySelector(".page-header");
  pageHeader.appendChild(searchBar);
  const searchInput = document.createElement("input");
  searchBar.appendChild(searchInput);
  searchInput.placeholder = "Search for students...";
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchBar.appendChild(searchButton);

  searchButton.addEventListener("click", () => {
    const nameSearched = searchInput.value;
    console.log(nameSearched);
    const studentListContainer = document.querySelector(".student-list");
    const studentNames = document.querySelectorAll("h3");
    const matchStudentList = [];
    paginationContainer.innerHTML = "";
    for (let i = 0; i < studentList.length; i++) {
      studentList[i].style.display = "none";
    }
    for (let i = 0; i < studentNames.length; i++) {
      if (
        nameSearched.length !== 0 &&
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
      console.log(matchStudentList);
    } else {
      studentListContainer.innerHTML =
        "<p>No results. Please refresh page and try another search.</p>";
      paginationContainer.style.display = "none";
      searchBar.remove();
    }
  });

  searchInput.addEventListener("keyup", () => {
    const nameSearched = searchInput.value;
    console.log(nameSearched);
    const studentListContainer = document.querySelector(".student-list");
    const studentNames = document.querySelectorAll("h3");
    const matchStudentList = [];
    paginationContainer.innerHTML = "";
    for (let i = 0; i < studentList.length; i++) {
      studentList[i].style.display = "none";
    }
    for (let i = 0; i < studentNames.length; i++) {
      if (
        nameSearched.length !== 0 &&
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
      console.log(matchStudentList);
    } else {
      studentListContainer.innerHTML =
        "<p>No results. Please refresh page and try another search.</p>";
      paginationContainer.style.display = "none";
      searchBar.remove();
    }
  });
};
showPage(studentList, 1);
appendPageLinks(studentList);
searchStudents();
document.querySelector("a").classList = "active";


