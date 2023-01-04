const addBtn = document.querySelector('.add-btn');
const submitBtn = document.querySelector('#submit-btn');
const cardsContainer = document.querySelector('.cards-container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const menu = document.querySelector('.input-menu');

let myLibrary = [];
let deleteBook;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? 'read': 'not read yet'}`;
    };
};

// const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// myLibrary.push(hobbit);

addBtn.addEventListener('click', () => {
    const menu = document.querySelector('.input-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    };
});


submitBtn.addEventListener('click', (e) => {
    if (!title.value || !author.value || !pages.value) {
        //change :after property
        console.log('empty input')
    } else {
        addBookToLibrary()
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
        title.value = '';
        author.value = '';
        pages.value = '';
        read.checked = false;
    };
});


function displayBooks() {
    cardsContainer.innerHTML = '';
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('h1');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data', `${myLibrary.findIndex(e => e.title == book.title)}`);
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = `${book.pages} pages`;
        card.append(author, title, pages, deleteBtn);
        cardsContainer.append(card);
    })
    deleteBook = document.querySelectorAll('.delete-btn');
    deleteBook.forEach((node) => {
        node.addEventListener('click', (e) => {
            myLibrary.splice(e.target.getAttribute('data'), 1);
            displayBooks();
        });
    });
    
};

function addBookToLibrary() {
    const book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    displayBooks();
};