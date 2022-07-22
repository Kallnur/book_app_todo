import { newBook } from "../constructor/constructor";
import { detailBook } from "../contentFunc/detailBook";
import { putRq } from "../utils/rqServer";
import { clearValueInputs } from "../utils/util";
import { validateAddBook } from "../utils/validate/validateBook";

export const updateBook = (book) => {

    const modalAddBook = document.querySelector('.modal-add-book');
    const tagBookName = document.querySelector('#add-book-name');
    const tagBookAuthor = document.querySelector('#add-book-author');
    const tagBookHouse = document.querySelector('#add-book-house');
    const tagBookLang = document.querySelector('#add-book-lang');
    const tagBookYear = document.querySelector('#add-book-year');
    const tagBookPage = document.querySelector('#add-book-page');
    const tagBookGenre = document.querySelector('#add-book-genre');
    const addBookBtn = document.querySelector('.modal__add-book-btn'); 
    const updateBookBtn = document.querySelector('.modal__update-book-btn');
    const tagFormBody = document.querySelector('.modal__form-body');
    const tagFormTitle = document.querySelector('.modal__title');

    tagFormTitle.textContent = 'Редактировать книгу';

    const userToken = JSON.parse(localStorage.getItem('bookDataCurrentUser'));

    modalAddBook.classList.add('modal-add-book--active');
    updateBookBtn.classList.remove('d-none');
    addBookBtn.classList.add('d-none');


    tagBookGenre.addEventListener('keypress', (e) => {
        if(e.key == ' ') {
            tagBookGenre.value += ',';
        }
    })

    tagBookName.value = book.name;
    tagBookAuthor.value = book.author;
    tagBookHouse.value = book.publishHouse;
    tagBookLang.value = book.originalLanguage;
    tagBookYear.value = book.publishYear;
    tagBookPage.value = book.pagesNumber;
    tagBookGenre.value = book.genres.join(', ');

    updateBookBtn?.addEventListener('click', (e) => {
        e.preventDefault();

        const valid = validateAddBook(tagFormBody);

        if(valid) {
            const newBookObj = newBook(tagBookName.value, tagBookAuthor.value, tagBookYear.value,
                tagBookHouse.value, tagBookPage.value, tagBookGenre.value.split(','), tagBookLang.value);

            const response = putRq(`http://localhost:1717/books/update/${book.id}`, newBookObj, userToken);

            modalAddBook.classList.remove('modal-add-book--active');
            clearValueInputs(tagFormBody);

            window.history.pushState({}, '', `detail-book?bookid=${book.id}`);
            detailBook();
        }
    })

}