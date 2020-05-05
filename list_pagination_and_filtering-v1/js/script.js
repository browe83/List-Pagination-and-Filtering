/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
   ***/
  const studentList = document.querySelectorAll('li');
  const perPage = 10;  
  const page = document.querySelector('div')
  const paginationContainer = document.createElement('div');
  paginationContainer.className="pagination";
  page.appendChild(paginationContainer);
  /*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
const showPage = (list, page) => {
   const startIndex = (page * perPage) - perPage;
   const endIndex = (page * perPage) - 1;
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i <= endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const numPages = Math.ceil(list.length/perPage)
   const paginationList = document.createElement('ul');
   paginationContainer.appendChild(paginationList);

   for (let i = 1; i <= numPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      paginationList.appendChild(li);
      li.appendChild(a);
      a.href= '#';
      a.textContent= i;
      a.addEventListener('click', (event) => {
         showPage(list, i);
         document.querySelector(`.active`).classList.remove('active');
         const eventTarget = event.target;
         eventTarget.classList.add('active');
         }
      )
   }
}

const searchList = (list) => {
   const searchBar = document.createElement('div');
   searchBar.classList.add('student-search');
   const pageHeader = document.querySelector('.page-header');
   pageHeader.appendChild(searchBar);
   const searchInput = document.createElement('input');
   searchBar.appendChild(searchInput);
   searchInput.placeholder="Search for students...";
   const searchButton = document.createElement('button');
   searchButton.textContent='Search';
   searchBar.appendChild(searchButton);
    
   
   searchButton.addEventListener('click', (e) => {
      const nameSearched = searchInput.value;
      console.log(nameSearched); 
      const studentNames = document.querySelectorAll('h3');
      //const studentListContainer = document.querySelector('.student-list');
      const matchStudentList = [];
      paginationContainer.innerHTML='';

      for (let i = 0; i < studentNames.length; i++){
         if (nameSearched.length !== 0 && studentNames[i].textContent.toLowerCase().includes(nameSearched.toLowerCase())) {
            const studentInfoList = studentNames[i].parentNode.parentNode;
            matchStudentList.push(studentInfoList);
          } 
         }
         if (matchStudentList.length > 0) {
            showPage(matchStudentList, 1);
            appendPageLinks(matchStudentList);
            document.querySelector('a').classList='active';
            console.log(matchStudentList);
         }
      })
}
showPage(studentList, 1); 
appendPageLinks(studentList);
searchList(studentList);
document.querySelector('a').classList='active';





// Remember to delete the comments that came with this file, and replace them with your own code comments.