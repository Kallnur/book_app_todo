import { newBook } from "../constructor/constructor";
import { mainMenu } from "../contentFunc/mainMenu";
import { postRq } from "../utils/rqServer";
import { clearValueInputs, closeModal } from "../utils/util";
import { validateAddBook } from "../utils/validate/validateBook";

export const addBook = () => {

    const modalAddBook = document.querySelector('.modal-add-book');
    const tagBookName = document.querySelector('#add-book-name');
    const tagBookAuthor = document.querySelector('#add-book-author');
    const tagBookHouse = document.querySelector('#add-book-house');
    const tagBookLang = document.querySelector('#add-book-lang');
    const tagBookYear = document.querySelector('#add-book-year');
    const tagBookPage = document.querySelector('#add-book-page');
    const tagBookGenre = document.querySelector('#add-book-genre');
    const addBookBtn = document.querySelector('.modal__add-book-btn');
    const tagFormBody = document.querySelector('.modal__form-body');
    const updateBookBtn = document.querySelector('.modal__update-book-btn');
    const tagFormTitle = document.querySelector('.modal__title');

    tagFormTitle.textContent = 'Добавить книгу';

    const userToken = JSON.parse(localStorage.getItem('bookDataCurrentUser'));

    modalAddBook.classList.add('modal-add-book--active');
    updateBookBtn.classList.add('d-none');
    addBookBtn.classList.remove('d-none');

    closeModal(modalAddBook);

    tagBookGenre.addEventListener('keypress', (e) => {
        if(e.key == ' ') {
            tagBookGenre.value += ',';
        }
    })

    addBookBtn?.addEventListener('click', (e) => {
        e.preventDefault();

        const valid = validateAddBook(tagFormBody);

        if(valid) {
            const newBookObj = newBook(tagBookName.value, tagBookAuthor.value, tagBookYear.value,
                tagBookHouse.value, tagBookPage.value, tagBookGenre.value.split(','), tagBookLang.value);

            const response = postRq('http://localhost:1717/books/create', newBookObj, userToken);

            modalAddBook.classList.remove('modal-add-book--active');
            clearValueInputs(tagFormBody);
            mainMenu();
        }
    })

}