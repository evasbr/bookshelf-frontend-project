const addBookButton = document.getElementById('add-book-button');
const showBooksButton = document.getElementById('show-books-button');
const searchBooksButton = document.getElementById('search-books-button');

const addBookContainer = document.getElementById('add-book-container');
const showBooksContainer = document.getElementById('show-books-container');
const searchBooksContainer = document.getElementById('search-books-container');

let isAddBookActive = true;
let isShowBookActive = false;
let isSearchBookActive = false;
addBookButton.addEventListener('click', ()=>{
    if(isAddBookActive !== true){
        isAddBookActive = true;
        isShowBookActive = false;
        isSearchBookActive = false;
        addBookContainer.style.display = 'block';
        showBooksContainer.style.display = 'none';
        searchBooksContainer.style.display = 'none';
    }
});

showBooksButton.addEventListener('click', ()=>{
    if(isShowBookActive !== true){
        isAddBookActive = false;
        isShowBookActive = true;
        isSearchBookActive = false;
        addBookContainer.style.display = 'none';
        showBooksContainer.style.display = 'block';
        searchBooksContainer.style.display = 'none';
    }
});

searchBooksButton.addEventListener('click', ()=>{
    if(isSearchBookActive !== true){
        isAddBookActive = false;
        isShowBookActive = false;
        isSearchBookActive = true;
        addBookContainer.style.display = 'none';
        showBooksContainer.style.display = 'none';
        searchBooksContainer.style.display = 'block';
    }
});

