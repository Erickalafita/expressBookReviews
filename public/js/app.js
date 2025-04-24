// DOM Elements - Move inside DOMContentLoaded to ensure page is fully loaded
let homeSectionEl, booksSectionEl, searchSectionEl, bookDetailsSectionEl, loginSectionEl, registerSectionEl;
let booksContainerEl, searchResultsEl, bookDetailsContainerEl, reviewsListEl;
let browseBooksBtnEl, allBooksNavEl, searchNavEl, loginNavEl, registerNavEl, backBtnEl, searchBtnEl; 
let searchTypeEl, searchQueryEl, loginLinkEl, registerLinkEl;
let loginFormEl, registerFormEl;

// State
let currentSection = null;
let previousSection = null;
let user = null;
let token = null;

// API Base URL
const API_URL = '/api';

// Functions
function showSection(section) {
    console.log('Showing section:', section.id);
    if (!section || !currentSection) {
        console.error('Section not found:', section);
        return;
    }
    currentSection.classList.remove('active-section');
    currentSection.classList.add('hidden');
    section.classList.remove('hidden');
    section.classList.add('active-section');
    previousSection = currentSection;
    currentSection = section;
}

async function fetchBooks() {
    console.log('Fetching books...');
    try {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        console.log('Books fetched:', books);
        displayBooks(books, booksContainerEl);
    } catch (error) {
        console.error('Error fetching books:', error);
        booksContainerEl.innerHTML = '<p>Error loading books. Please try again later.</p>';
    }
}

async function searchBooks() {
    const searchType = searchTypeEl.value;
    const query = searchQueryEl.value.trim();
    
    if (!query) {
        searchResultsEl.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }
    
    searchResultsEl.innerHTML = '<p>Searching...</p>';
    
    try {
        let response;
        switch (searchType) {
            case 'isbn':
                response = await fetch(`${API_URL}/books/isbn/${query}`);
                const book = await response.json();
                if (response.ok) {
                    displayBooks([book], searchResultsEl);
                } else {
                    searchResultsEl.innerHTML = '<p>No books found with that ISBN.</p>';
                }
                break;
            case 'author':
                response = await fetch(`${API_URL}/books/author/${query}`);
                const authorBooks = await response.json();
                if (response.ok && authorBooks.length > 0) {
                    displayBooks(authorBooks, searchResultsEl);
                } else {
                    searchResultsEl.innerHTML = '<p>No books found by that author.</p>';
                }
                break;
            case 'title':
                response = await fetch(`${API_URL}/books/title/${query}`);
                const titleBooks = await response.json();
                if (response.ok && titleBooks.length > 0) {
                    displayBooks(titleBooks, searchResultsEl);
                } else {
                    searchResultsEl.innerHTML = '<p>No books found with that title.</p>';
                }
                break;
        }
    } catch (error) {
        console.error('Error searching books:', error);
        searchResultsEl.innerHTML = '<p>Error searching books. Please try again later.</p>';
    }
}

function displayBooks(books, container) {
    container.innerHTML = '';
    
    if (!books || books.length === 0) {
        container.innerHTML = '<p>No books found.</p>';
        return;
    }
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book._id;
        
        // Create dynamic colored cover with title text instead of using placeholder images
        const bookColor = getRandomColor(book.title);
        
        bookCard.innerHTML = `
            <div class="book-image" style="background-color: ${bookColor};">
                <div class="book-cover-title">${book.title}</div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price.toFixed(2)}</p>
            </div>
        `;
        
        bookCard.addEventListener('click', () => showBookDetails(book._id));
        container.appendChild(bookCard);
    });
}

// Function to get a random color based on book title
function getRandomColor(title) {
    // Generate a color based on the title string to keep colors consistent per book
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a pastel color (lighter and less saturated)
    const h = hash % 360;
    return `hsl(${h}, 70%, 80%)`;
}

async function showBookDetails(bookId) {
    // For demo purposes, since we don't have individual book endpoints
    let book;
    try {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        book = books.find(b => b._id === bookId);
        
        if (!book) {
            bookDetailsContainerEl.innerHTML = '<p>Book not found.</p>';
            showSection(bookDetailsSectionEl);
            return;
        }
        
        // Use dynamic colored cover instead of placeholder image
        const bookColor = getRandomColor(book.title);
        
        bookDetailsContainerEl.innerHTML = `
            <div class="book-details">
                <div class="book-details-image" style="background-color: ${bookColor};">
                    <div class="book-cover-title">${book.title}</div>
                </div>
                <div class="book-details-info">
                    <h2 class="book-details-title">${book.title}</h2>
                    <p class="book-details-author">by ${book.author}</p>
                    <p class="book-details-description">${book.description || 'No description available.'}</p>
                    <p class="book-details-isbn">ISBN: ${book.isbn}</p>
                    <p class="book-details-price">$${book.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        
        // Dummy reviews for demo
        reviewsListEl.innerHTML = `
            <div class="review">
                <div class="review-header">
                    <span class="review-user">John Doe</span>
                    <span class="review-rating">★★★★☆</span>
                </div>
                <span class="review-date">3 days ago</span>
                <p class="review-comment">Great book! I loved the characters and the storyline.</p>
            </div>
            <div class="review">
                <div class="review-header">
                    <span class="review-user">Jane Smith</span>
                    <span class="review-rating">★★★★★</span>
                </div>
                <span class="review-date">1 week ago</span>
                <p class="review-comment">Couldn't put it down. Definitely a must-read!</p>
            </div>
        `;
        
        showSection(bookDetailsSectionEl);
    } catch (error) {
        console.error('Error fetching book details:', error);
        bookDetailsContainerEl.innerHTML = '<p>Error loading book details. Please try again later.</p>';
        showSection(bookDetailsSectionEl);
    }
}

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Initialize DOM elements
    homeSectionEl = document.getElementById('home-section');
    booksSectionEl = document.getElementById('books-section');
    searchSectionEl = document.getElementById('search-section');
    bookDetailsSectionEl = document.getElementById('book-details-section');
    loginSectionEl = document.getElementById('login-section');
    registerSectionEl = document.getElementById('register-section');

    booksContainerEl = document.getElementById('books-container');
    searchResultsEl = document.getElementById('search-results');
    bookDetailsContainerEl = document.getElementById('book-details-container');
    reviewsListEl = document.getElementById('reviews-list');

    browseBooksBtnEl = document.getElementById('browse-books-btn');
    allBooksNavEl = document.getElementById('all-books-nav');
    searchNavEl = document.getElementById('search-nav');
    loginNavEl = document.getElementById('login-nav');
    registerNavEl = document.getElementById('register-nav');
    backBtnEl = document.getElementById('back-btn');
    searchBtnEl = document.getElementById('search-btn');
    searchTypeEl = document.getElementById('search-type');
    searchQueryEl = document.getElementById('search-query');
    loginLinkEl = document.getElementById('login-link');
    registerLinkEl = document.getElementById('register-link');

    loginFormEl = document.getElementById('login-form');
    registerFormEl = document.getElementById('register-form');
    
    // Set initial section
    currentSection = homeSectionEl;
    
    // Add event listeners
    console.log('Adding event listeners...');
    
    if (browseBooksBtnEl) {
        console.log('Browse books button found');
        browseBooksBtnEl.addEventListener('click', () => {
            console.log('Browse books button clicked');
            fetchBooks();
            showSection(booksSectionEl);
        });
    } else {
        console.error('Browse books button not found');
    }

    if (allBooksNavEl) {
        allBooksNavEl.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('All books nav clicked');
            fetchBooks();
            showSection(booksSectionEl);
        });
    }

    if (searchNavEl) {
        searchNavEl.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Search nav clicked');
            showSection(searchSectionEl);
        });
    }

    if (loginNavEl) {
        loginNavEl.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Login nav clicked');
            showSection(loginSectionEl);
        });
    }

    if (registerNavEl) {
        registerNavEl.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Register nav clicked');
            showSection(registerSectionEl);
        });
    }

    if (backBtnEl) {
        backBtnEl.addEventListener('click', () => {
            console.log('Back button clicked');
            if (previousSection) {
                showSection(previousSection);
            }
        });
    }

    if (searchBtnEl) {
        searchBtnEl.addEventListener('click', searchBooks);
    }

    if (searchQueryEl) {
        searchQueryEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBooks();
            }
        });
    }

    if (loginLinkEl) {
        loginLinkEl.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(loginSectionEl);
        });
    }

    if (registerLinkEl) {
        registerLinkEl.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(registerSectionEl);
        });
    }

    if (loginFormEl) {
        loginFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality is not implemented in demo mode.');
        });
    }

    if (registerFormEl) {
        registerFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Registration functionality is not implemented in demo mode.');
        });
    }
    
    console.log('Initialization complete');
}); 