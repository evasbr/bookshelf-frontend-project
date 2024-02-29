let books =[];
let totalBooks, finishedBooks;

const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-books'
const STORAGE_KEY = 'BOOKS_APPS';

function isStorageExist(){
    if(typeof (Storage) === undefined){
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function loadDataFromStorage(){
    const dataFromLocalStorage = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(dataFromLocalStorage);

    if(data !== null){
        for(const book of data){
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId(){
    return +new Date();
}

function generateBookObj(id, title, author, year, isComplete){
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function findIndex(bookId){
    let index = 0;
    for(const book of books){
        if(bookId === book.id){
            return index;
        }
        index++;
    }
    return -1;
}

function moveToFinished(bookId){
    const index = findIndex(bookId);
    books[index].isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId){
    let confirmation = confirm("Apakah Anda yakin ingin menghapus buku?");
    if(confirmation){
        const index = findIndex(bookId);
        books.splice(index, 1);
        alert("Buku berhasil dihapus");
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    } else {
        alert("Buku tidak jadi dihapus");
    }
}

function undoFinishedBook(bookId){
    const index = findIndex(bookId);
    books[index].isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBook(){
    let bookId = generateId();
    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('book-author').value;
    let bookYear =  document.getElementById('book-year').value;
    bookYear = parseInt(bookYear);
    const isCompletedCheck = document.getElementById('isFinished-checkbox');
    let isComplete;
    if(isCompletedCheck.checked){
        isComplete = true;
    } else {
        isComplete = false;
    }
    bookObject = generateBookObj(bookId, bookTitle, bookAuthor, bookYear, isComplete);
    books.push(bookObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function makeBookElement(bookObj){
    const bookTitle = document.createElement('h1');
    bookTitle.classList.add('title');
    bookTitle.innerText = bookObj.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.innerText = `Penulis : ${bookObj.author}`;

    const bookYear = document.createElement('p');
    bookYear.classList.add('year-published');
    bookYear.innerText = `Tanggal Terbit : ${bookObj.year}`;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.classList.add('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(){
        deleteBook(bookObj.id)
    });

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner');
    innerDiv.append(bookTitle, bookAuthor, bookYear);
    innerDiv.setAttribute('id', `book-${bookObj.id}`);

    if(bookObj.isComplete == false){
        const finishedButton = document.createElement('button');
        finishedButton.innerText = 'Selesai Dibaca';
        finishedButton.classList.add('button');
        finishedButton.setAttribute('id', 'finished-button');
        finishedButton.addEventListener('click', function(){
            moveToFinished(bookObj.id)
        });

        innerDiv.append(finishedButton, deleteButton);
        return innerDiv;
    } else {
        const undoButton = document.createElement('button');
        undoButton.innerText = 'Belum Selesai Dibaca';
        undoButton.classList.add('button');
        undoButton.setAttribute('id', 'undo-finished-button');
        undoButton.addEventListener('click', function(){
            undoFinishedBook(bookObj.id)
        });

        innerDiv.append(undoButton, deleteButton);
        return innerDiv;
    }
}

function makeSearchElement(bookObj){
    const bookTitle = document.createElement('h1');
    bookTitle.classList.add('title');
    bookTitle.innerText = bookObj.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.innerText = `Penulis : ${bookObj.author}`;

    const bookYear = document.createElement('p');
    bookYear.classList.add('year-published');
    bookYear.innerText = `Tahun : ${bookObj.year}`;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.classList.add('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function(){
        deleteBook(bookObj.id)
    });

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner');
    innerDiv.append(bookTitle, bookAuthor, bookYear);
    innerDiv.setAttribute('id', `bookSearch-${bookObj.id}`);

    if(bookObj.isComplete == false){
        const finishedButton = document.createElement('button');
        finishedButton.innerText = 'Selesai Dibaca';
        finishedButton.classList.add('button');
        finishedButton.setAttribute('id', 'finished-button');
        finishedButton.addEventListener('click', function(){
            moveToFinished(bookObj.id)
        });

        innerDiv.append(finishedButton, deleteButton);
        return innerDiv;
    } else {
        const undoButton = document.createElement('button');
        undoButton.innerText = 'Belum Selesai Dibaca';
        undoButton.classList.add('button');
        undoButton.setAttribute('id', 'undo-finished-button');
        undoButton.addEventListener('click', function(){
            undoFinishedBook(bookObj.id)
        });

        innerDiv.append(undoButton, deleteButton);
        return innerDiv;
    }
}

document.addEventListener('DOMContentLoaded', function (){
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });

    const searchBooksForm = document.getElementById('search-form');
    searchBooksForm.addEventListener('submit', function(event){
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

function searchBook(){
    const searchTitle = document.getElementById('search-book-title').value;
    const searchWrapper = document.getElementById('search-books-container');
    const oldSearchContainer = document.getElementById('search-list');

    if(oldSearchContainer !== null){
        oldSearchContainer.remove();
    }
    
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('shelf-container');
    searchContainer.setAttribute('id', 'search-list');

    searchWrapper.append(searchContainer);  

    for(const book of books){
        if(book.title.toLowerCase().includes(searchTitle.toLowerCase())){
            let bookSearchElement = makeSearchElement(book);
            
            const keterangan = document.createElement('p');
            keterangan.classList.add('keterangan-search', 'button');
            if(book.isComplete){
                keterangan.innerText = "Selesai Dibaca";
            } else {
                keterangan.innerText = "Belum Selesai Dibaca";
            }
            const br = document.createElement('br');
            bookSearchElement.append(br);
            bookSearchElement.append(keterangan);
            searchContainer.append(bookSearchElement);
        }
    }
}

document.addEventListener(RENDER_EVENT, function(){
    const unfinishedContainer = document.getElementById('unfinished-book-list');
    const finishedContainer = document.getElementById('finished-book-list');
    
    unfinishedContainer.innerHTML = '';
    finishedContainer.innerHTML = '';
    totalBooks = 0;
    finishedBooks = 0;

    for (const book of books) {
        totalBooks++;
        const bookElement = makeBookElement(book);
        if (book.isComplete) {
            finishedContainer.append(bookElement);
            finishedBooks++;
        } else {
            unfinishedContainer.append(bookElement);
        }
    }

    const totalBookCount = document.getElementById('total-book-score');
    totalBookCount.innerText = totalBooks;
    const finishedBookCount = document.getElementById('finished-book-score');
    finishedBookCount.innerText = finishedBooks;

    searchBook();
});

document.addEventListener(SAVED_EVENT, function(){
    console.log(localStorage.getItem(STORAGE_KEY));
});
