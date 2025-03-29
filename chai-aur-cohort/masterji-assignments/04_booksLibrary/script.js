const bookContainer = document.querySelector(".book-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumber = document.getElementById("page-number");
const viewToggle = document.getElementById("view-toggle");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const sort = document.getElementById("sort");

let page = 1;
let limit = 10;
let isListView = false; // Default grid view
let books = []; // Store fetched books
let totalPages = 1; // Store total pages

// Fetch Books
async function fetchBooks(query = "") {
    let url = `https://api.freeapi.app/api/v1/public/books?page=${page}&limit=${limit}`;
    if (query) {
        url += `&search=${query}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            books = data.data.data;
            totalPages = data.data.totalPages; // Store total pages
            displayBooks(books);
        })
        .catch(error => console.error("Error fetching books:", error));
}

// Display Books
// bookdata is the data that we get from the fetchBooks function
function displayBooks(bookdata) {
    bookContainer.innerHTML = "";
    bookdata.forEach(book => {
        const title = book.volumeInfo?.title || "No Title";
        const authors = book.volumeInfo?.authors?.join(", ") || "Unknown";
        const publisher = book.volumeInfo?.publisher || "Unknown";
        const publishedDate = book.volumeInfo?.publishedDate || "Unknown";
        const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/100x150";

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.addEventListener("click", () => window.open(book.volumeInfo?.infoLink, "_blank"));

        bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div class="book-details">
                <h3>${title}</h3>
                <p><b>Authors:</b> ${authors}</p>
                <p><b>Publisher:</b> ${publisher}</p>
                <p><b>Published:</b> ${publishedDate}</p>
            </div>
        `;

        bookContainer.appendChild(bookCard);
    });

    pageNumber.textContent = `Page ${page}`;
    prevBtn.disabled = page <= 1; // Disable prev button on first page
    nextBtn.disabled = page >= totalPages; // Disable next button on last page

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Handle Pagination
prevBtn.addEventListener("click", () => {
    if (page > 1) {
        page--;
        fetchBooks();
    }
});
nextBtn.addEventListener("click", () => {
    if (page < totalPages) {
        page++;
        fetchBooks();
    }
});

// Toggle List/Grid View
viewToggle.addEventListener("click", () => {
    isListView = !isListView;
    bookContainer.classList.toggle("list-view", isListView);
    viewToggle.textContent = isListView ? "Switch to Grid View" : "Switch to List View";
});

// Search Books
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredBooks = books.filter(book =>
        (book.volumeInfo?.title || "").toLowerCase().includes(query)
        || (book.volumeInfo?.authors?.join(", ") || "").toLowerCase().includes(query)
    );

    // logic for searching books globally, but as it wont work with author so we will not use this
    // fetch(`https://api.freeapi.app/api/v1/public/books?query=${query}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data.data.data);
    //         books = data.data.data;
    //         displayBooks(books);
    //     })

    page = 1; // Reset page when searching
    displayBooks(filteredBooks);
});

// Sort Books
sort.addEventListener("click", () => {
    // Get displayed books and their titles
    const displayedBooks = [...document.querySelectorAll(".book-card")].map(card => {
        return {
            title: card.querySelector("h3").textContent,
            element: card
        };
    });

    // Sort books by title
    displayedBooks.sort((a, b) => a.title.localeCompare(b.title));

    bookContainer.innerHTML = "";
    displayedBooks.forEach(book => bookContainer.appendChild(book.element));
});


// Load Books
fetchBooks();
