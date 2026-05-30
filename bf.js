// const searchInput = document.getElementById("searchInput");
// const searchBtn = document.getElementById("searchBtn");

// const booksContainer =
// document.getElementById("booksContainer");

// const favoritesContainer =
// document.getElementById("favoritesContainer");

// const historyList =
// document.getElementById("historyList");

// const themeBtn =
// document.getElementById("themeBtn");

// const loader =
// document.getElementById("loader");

// const modal =
// document.getElementById("bookModal");

// const modalBody =
// document.getElementById("modalBody");

// const closeModal =
// document.getElementById("closeModal");

// let favorites =
// JSON.parse(
// localStorage.getItem("favorites")
// ) || [];

// let searchHistory =
// JSON.parse(
// localStorage.getItem("searchHistory")
// ) || [];

// let currentBooks = [];

// /* =========================
//    THEME
// ========================= */

// if(localStorage.getItem("theme") === "light"){

//     document.body.classList.add("light");
//     themeBtn.textContent = "☀️";

// }

// themeBtn.addEventListener("click",()=>{

//     document.body.classList.toggle("light");

//     if(document.body.classList.contains("light")){

//         localStorage.setItem(
//             "theme",
//             "light"
//         );

//         themeBtn.textContent = "☀️";

//     }else{

//         localStorage.setItem(
//             "theme",
//             "dark"
//         );

//         themeBtn.textContent = "🌙";

//     }

// });

// /* =========================
//    SEARCH BOOKS
// ========================= */

// async function searchBooks(query){

//     if(!query.trim()) return;

//     showLoader();

//     try{

//         const response =
//         await fetch(
//         `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
//         );

//         const data =
//         await response.json();

//         hideLoader();

//         if(!data.docs || data.docs.length === 0){

//             booksContainer.innerHTML = `
//             <div class="empty-state">
//             No books found 📚
//             </div>
//             `;

//             return;
//         }

//         currentBooks =
//         data.docs.slice(0,20);

//         renderBooks(currentBooks);

//         saveSearch(query);

//     }
//     catch(error){

//         hideLoader();

//         booksContainer.innerHTML = `
//         <div class="empty-state">
//         Something went wrong 🚨
//         </div>
//         `;

//         console.error(error);
//     }

// }

// /* =========================
//    RENDER BOOKS
// ========================= */

// function renderBooks(books){

//     booksContainer.innerHTML = "";

//     books.forEach((book,index)=>{

//         const image =

//         book.cover_i

//         ?

//         `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

//         :

//         "https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover";

//         const title =
//         book.title || "Unknown";

//         const author =
//         book.author_name
//         ? book.author_name[0]
//         : "Unknown Author";

//         const card =
//         document.createElement("div");

//         card.classList.add("book-card");

//         card.innerHTML = `

//         <img src="${image}">

//         <div class="book-info">

//             <h3>${title}</h3>

//             <p>✍️ ${author}</p>

//             <p>
//             📅 ${book.first_publish_year || "N/A"}
//             </p>

//             <div class="card-buttons">

//                 <button
//                 class="details-btn"
//                 data-index="${index}">
//                 Details
//                 </button>

//                 <button
//                 class="favorite-btn"
//                 data-index="${index}">
//                 ❤️ Save
//                 </button>

//             </div>

//         </div>

//         `;

//         booksContainer.appendChild(card);

//     });

//     document
//     .querySelectorAll(".details-btn")
//     .forEach(btn=>{

//         btn.addEventListener(
//         "click",
//         ()=>{

//             const index =
//             btn.dataset.index;

//             showBookDetails(
//             currentBooks[index]
//             );

//         });

//     });

//     document
//     .querySelectorAll(".favorite-btn")
//     .forEach(btn=>{

//         btn.addEventListener(
//         "click",
//         ()=>{

//             const index =
//             btn.dataset.index;

//             addToFavorites(
//             currentBooks[index]
//             );

//         });

//     });

// }

// /* =========================
//    MODAL
// ========================= */

// function showBookDetails(book){

//     const image =

//     book.cover_i

//     ?

//     `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

//     :

//     "https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover";

//     modalBody.innerHTML = `

//     <div class="modal-book">

//         <img src="${image}">

//         <div>

//             <h2>${book.title}</h2>

//             <br>

//             <p>
//             <strong>Author:</strong>
//             ${
//                 book.author_name
//                 ? book.author_name.join(", ")
//                 : "Unknown"
//             }
//             </p>

//             <br>

//             <p>
//             <strong>First Published:</strong>
//             ${
//                 book.first_publish_year || "N/A"
//             }
//             </p>

//             <br>

//             <p>
//             <strong>Language:</strong>
//             ${
//                 book.language
//                 ? book.language.join(", ")
//                 : "N/A"
//             }
//             </p>

//             <br>

//             <p>
//             <strong>Edition Count:</strong>
//             ${
//                 book.edition_count || "N/A"
//             }
//             </p>

//         </div>

//     </div>

//     `;

//     modal.style.display = "flex";

// }

// closeModal.addEventListener(
// "click",
// ()=>{
// modal.style.display = "none";
// }
// );

// window.addEventListener(
// "click",
// (e)=>{
// if(e.target === modal){
// modal.style.display = "none";
// }
// }
// );

// /* =========================
//    FAVORITES
// ========================= */

// function addToFavorites(book){

//     const exists =
//     favorites.find(
//     item =>
//     item.key === book.key
//     );

//     if(exists){

//         alert(
//         "Already in Favorites ❤️"
//         );

//         return;

//     }

//     favorites.push(book);

//     localStorage.setItem(
//     "favorites",
//     JSON.stringify(favorites)
//     );

//     renderFavorites();

// }

// function renderFavorites(){

//     favoritesContainer.innerHTML = "";

//     if(favorites.length === 0){

//         favoritesContainer.innerHTML = `
//         <div class="empty-state">
//         No favorites yet ❤️
//         </div>
//         `;

//         return;
//     }

//     favorites.forEach(book=>{

//         const image =

//         book.cover_i

//         ?

//         `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

//         :

//         "https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover";

//         favoritesContainer.innerHTML += `

//         <div class="book-card">

//             <img src="${image}">

//             <div class="book-info">

//                 <h3>${book.title}</h3>

//                 <p>
//                 ✍️ ${
//                 book.author_name
//                 ? book.author_name[0]
//                 : "Unknown"
//                 }
//                 </p>

//                 <div class="card-buttons">

//                     <button
//                     class="favorite-btn"
//                     onclick="removeFavorite('${book.key}')">
//                     Remove
//                     </button>

//                 </div>

//             </div>

//         </div>

//         `;

//     });

// }

// function removeFavorite(key){

//     favorites =
//     favorites.filter(
//     book => book.key !== key
//     );

//     localStorage.setItem(
//     "favorites",
//     JSON.stringify(favorites)
//     );

//     renderFavorites();

// }

// /* =========================
//    SEARCH HISTORY
// ========================= */

// function saveSearch(query){

//     searchHistory =
//     searchHistory.filter(
//     item => item !== query
//     );

//     searchHistory.unshift(query);

//     searchHistory =
//     searchHistory.slice(0,5);

//     localStorage.setItem(
//     "searchHistory",
//     JSON.stringify(searchHistory)
//     );

//     renderHistory();

// }

// function renderHistory(){

//     historyList.innerHTML = "";

//     searchHistory.forEach(item=>{

//         const chip =
//         document.createElement("div");

//         chip.classList.add(
//         "history-item"
//         );

//         chip.textContent = item;

//         chip.addEventListener(
//         "click",
//         ()=>{
//             searchInput.value = item;
//             searchBooks(item);
//         }
//         );

//         historyList.appendChild(chip);

//     });

// }

// /* =========================
//    LOADER
// ========================= */

// function showLoader(){

//     loader.style.display = "block";

// }

// function hideLoader(){

//     loader.style.display = "none";

// }

// /* =========================
//    EVENTS
// ========================= */

// searchBtn.addEventListener(
// "click",
// ()=>{
// searchBooks(
// searchInput.value
// );
// }
// );

// searchInput.addEventListener(
// "keypress",
// (e)=>{

// if(e.key === "Enter"){

// searchBooks(
// searchInput.value
// );

// }

// }
// );

// /* =========================
//    INITIAL LOAD
// ========================= */

// renderFavorites();
// renderHistory();

// searchBooks("Harry Potter");










/* =========================
   ELEMENTS
========================= */

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const voiceBtn =
document.getElementById("voiceBtn");

const booksContainer =
document.getElementById("booksContainer");

const historyList =
document.getElementById("historyList");

const loader =
document.getElementById("loader");

const toast =
document.getElementById("toast");

const themeBtn =
document.getElementById("themeBtn");

const categoryBtns =
document.querySelectorAll(".category-btn");

/* =========================
   GLOBALS
========================= */

let currentBooks = [];

let currentPage = 1;

let currentQuery = "";

let searchHistory =
JSON.parse(
localStorage.getItem("searchHistory")
) || [];

let stats = JSON.parse(
localStorage.getItem("stats")
) || {

searches:0

};

/* =========================
   TOAST
========================= */

function showToast(message){

toast.textContent = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},3000);

}

/* =========================
   LOADER
========================= */

function showLoader(){

loader.style.display = "block";

}

function hideLoader(){

loader.style.display = "none";

}

/* =========================
   DASHBOARD
========================= */

function updateDashboard(){

document.getElementById(
"totalSearches"
).textContent =
stats.searches;

const favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

document.getElementById(
"favoriteCount"
).textContent =
favorites.length;

const reading =
JSON.parse(
localStorage.getItem("readingList")
) || [];

document.getElementById(
"readingCount"
).textContent =
reading.length;

const ratings =
JSON.parse(
localStorage.getItem("ratings")
) || {};

document.getElementById(
"ratedCount"
).textContent =
Object.keys(ratings).length;

}

/* =========================
   THEME
========================= */

if(
localStorage.getItem("theme")
=== "light"
){

document.body.classList.add(
"light"
);

themeBtn.textContent = "☀️";

}

themeBtn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"light"
);

if(
document.body.classList.contains(
"light"
)
){

localStorage.setItem(
"theme",
"light"
);

themeBtn.textContent = "☀️";

}else{

localStorage.setItem(
"theme",
"dark"
);

themeBtn.textContent = "🌙";

}

}
);

/* =========================
   SEARCH HISTORY
========================= */

function saveSearch(query){

searchHistory =
searchHistory.filter(
item => item !== query
);

searchHistory.unshift(query);

searchHistory =
searchHistory.slice(0,5);

localStorage.setItem(
"searchHistory",
JSON.stringify(searchHistory)
);

renderHistory();

}

function renderHistory(){

historyList.innerHTML = "";

searchHistory.forEach(item=>{

const chip =
document.createElement("div");

chip.classList.add(
"history-item"
);

chip.textContent = item;

chip.addEventListener(
"click",
()=>{

searchInput.value = item;

searchBooks(item);

}
);

historyList.appendChild(chip);

});

}

/* =========================
   SEARCH BOOKS
========================= */

async function searchBooks(query){

if(!query.trim()) return;

currentQuery = query;

showLoader();

try{

const response =
await fetch(
`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=1`
);

const data =
await response.json();

hideLoader();

if(
!data.docs ||
data.docs.length === 0
){

booksContainer.innerHTML = `

<div class="empty-state">

No books found 📚

</div>

`;

return;

}

currentBooks =
data.docs.slice(0,20);

renderBooks(
currentBooks
);

saveSearch(query);

stats.searches++;

localStorage.setItem(
"stats",
JSON.stringify(stats)
);

updateDashboard();

showToast(
"Books Loaded 📚"
);

}
catch(error){

hideLoader();

console.error(error);

booksContainer.innerHTML = `

<div class="empty-state">

Something went wrong 🚨

</div>

`;

}

}

/* =========================
   SEARCH EVENTS
========================= */

searchBtn.addEventListener(
"click",
()=>{

searchBooks(
searchInput.value
);

}
);

searchInput.addEventListener(
"keypress",
(e)=>{

if(
e.key === "Enter"
){

searchBooks(
searchInput.value
);

}

}
);

/* =========================
   VOICE SEARCH
========================= */

if(
'webkitSpeechRecognition'
in window
){

const recognition =
new webkitSpeechRecognition();

recognition.lang =
"en-US";

voiceBtn.addEventListener(
"click",
()=>{

recognition.start();

showToast(
"Listening..."
);

}
);

recognition.onresult =
function(event){

const text =
event.results[0][0]
.transcript;

searchInput.value =
text;

searchBooks(text);

};

}

/* =========================
   CATEGORY FILTERS
========================= */

categoryBtns.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

const category =
btn.textContent;

searchInput.value =
category;

searchBooks(category);

}
);

});

/* =========================
   PLACEHOLDER
   (Part B me complete)
========================= */



/* =========================
   INIT
========================= */

renderHistory();

updateDashboard();

searchBooks("Java");

/* =========================
   FAVORITES
========================= */

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

let readingList =
JSON.parse(
localStorage.getItem("readingList")
) || [];

let ratings =
JSON.parse(
localStorage.getItem("ratings")
) || {};

const favoritesContainer =
document.getElementById(
"favoritesContainer"
);

const readingListContainer =
document.getElementById(
"readingListContainer"
);

const modal =
document.getElementById(
"bookModal"
);

const modalBody =
document.getElementById(
"modalBody"
);

const closeModal =
document.getElementById(
"closeModal"
);

/* =========================
   RENDER BOOKS
========================= */

function renderBooks(books){

booksContainer.innerHTML = "";

books.forEach((book,index)=>{

const image =

book.cover_i

?

`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

:

"https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover";

const card =
document.createElement("div");

card.classList.add(
"book-card"
);

card.innerHTML = `

<img src="${image}">

<div class="book-info">

<h3>
${book.title}
</h3>

<p>
✍️ ${
book.author_name
? book.author_name[0]
: "Unknown Author"
}
</p>

<p>
📅 ${
book.first_publish_year
|| "N/A"
}
</p>

<div class="rating">

${generateStars(book)}

</div>

<div class="card-buttons">

<button
class="details-btn"
data-index="${index}">
Details
</button>

<button
class="favorite-btn"
data-index="${index}">
❤️ Favorite
</button>

<button
class="read-btn"
data-index="${index}">
📖 Read
</button>

</div>

</div>

`;

booksContainer.appendChild(
card
);

});

/* Events */

document
.querySelectorAll(
".details-btn"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

showBookDetails(
currentBooks[
btn.dataset.index
]
);

});

});

document
.querySelectorAll(
".favorite-btn"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

addFavorite(
currentBooks[
btn.dataset.index
]
);

});

});

document
.querySelectorAll(
".read-btn"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

addReadingList(
currentBooks[
btn.dataset.index
]
);

});

});

}

/* =========================
   STARS
========================= */

function generateStars(book){

const key =
book.key;

const saved =
ratings[key] || 0;

let html = "";

for(
let i=1;
i<=5;
i++
){

html += `

<span
class="star"
onclick="rateBook('${key}',${i})">

${i<=saved?"⭐":"☆"}

</span>

`;

}

return html;

}

function rateBook(
key,
rating
){

ratings[key] =
rating;

localStorage.setItem(
"ratings",
JSON.stringify(ratings)
);

updateDashboard();

renderBooks(
currentBooks
);

showToast(
"Rating Saved ⭐"
);

}

/* =========================
   FAVORITES
========================= */

function addFavorite(book){

const exists =
favorites.find(
item =>
item.key === book.key
);

if(exists){

showToast(
"Already Added ❤️"
);

return;

}

favorites.push(book);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

renderFavorites();

updateDashboard();

showToast(
"Added to Favorites ❤️"
);

}

function renderFavorites(){

favoritesContainer.innerHTML = "";

if(
favorites.length === 0
){

favoritesContainer.innerHTML =
`
<div class="empty-state">
No favorites yet ❤️
</div>
`;

return;

}

favorites.forEach(book=>{

favoritesContainer.innerHTML += `

<div class="book-card">

<img
src="${
book.cover_i
?
`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
:
'https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover'
}">

<div class="book-info">

<h3>
${book.title}
</h3>

<button
class="favorite-btn"
onclick="removeFavorite('${book.key}')">

Remove

</button>

</div>

</div>

`;

});

}

function removeFavorite(key){

favorites =
favorites.filter(
book =>
book.key !== key
);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

renderFavorites();

updateDashboard();

showToast(
"Removed ❤️"
);

}

/* =========================
   READING LIST
========================= */

function addReadingList(book){

const exists =
readingList.find(
item =>
item.key === book.key
);

if(exists){

showToast(
"Already Added 📖"
);

return;

}

readingList.push(book);

localStorage.setItem(
"readingList",
JSON.stringify(readingList)
);

renderReadingList();

updateDashboard();

showToast(
"Added to Reading List 📖"
);

}

function renderReadingList(){

readingListContainer.innerHTML = "";

if(
readingList.length === 0
){

readingListContainer.innerHTML =
`
<div class="empty-state">
No books in Reading List 📖
</div>
`;

return;

}

readingList.forEach(book=>{

readingListContainer.innerHTML += `

<div class="book-card">

<img
src="${
book.cover_i
?
`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
:
'https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover'
}">

<div class="book-info">

<h3>
${book.title}
</h3>

<button
class="read-btn"
onclick="removeReading('${book.key}')">

Remove

</button>

</div>

</div>

`;

});

}

function removeReading(key){

readingList =
readingList.filter(
book =>
book.key !== key
);

localStorage.setItem(
"readingList",
JSON.stringify(readingList)
);

renderReadingList();

updateDashboard();

showToast(
"Removed 📖"
);

}

/* =========================
   MODAL
========================= */

function showBookDetails(book){

const image =

book.cover_i

?

`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`

:

"https://dummyimage.com/300x450/1e293b/ffffff&text=No+Cover";

modalBody.innerHTML = `

<div class="modal-book">

<img src="${image}">

<div>

<h2>
${book.title}
</h2>

<p>

<strong>Author:</strong>

${book.author_name
? book.author_name.join(", ")
: "Unknown"}

</p>

<p>

<strong>Published:</strong>

${book.first_publish_year
|| "N/A"}

</p>

<p>

<strong>Editions:</strong>

${book.edition_count
|| "N/A"}

</p>

<div
class="genre-container">

<span class="genre-chip">

Book

</span>

</div>

<a
class="read-more"
target="_blank"
href="https://openlibrary.org${book.key}">

Open Library →

</a>

</div>

</div>

`;

modal.style.display =
"flex";

}

closeModal.addEventListener(
"click",
()=>{

modal.style.display =
"none";

}
);

window.addEventListener(
"click",
e=>{

if(
e.target === modal
){

modal.style.display =
"none";

}

}
);

/* =========================
   INFINITE SCROLL
========================= */

window.addEventListener(
"scroll",
()=>{

if(

window.innerHeight +
window.scrollY

>=

document.body.offsetHeight
- 200

){

console.log(
"Infinite Scroll Ready"
);

}

}
);

/* =========================
   INIT
========================= */

renderFavorites();

renderReadingList();

updateDashboard();