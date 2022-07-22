import { updateBook } from "../modalFunc/updateBook";
import { deleteBook, getRq } from "../utils/rqServer";
import { closeAllPage, loadFuncPath, toggleFavorite } from "../utils/util";
import { mainMenu } from "./mainMenu";

export const detailBook = () => {

    const tagBookAuthor = document.querySelector('.detail-book__author');
    const tagDetailBook = document.querySelector('.detail-book');
    const tagBookHouse = document.querySelector('.detail-book__info-house');
    const tagBookPages = document.querySelector('.detail-book__info-page');
    const tagBookGenre = document.querySelector('.detail-book__info-genre');
    const tagBookname = document.querySelector('.detail-book__name');
    const tagBookLang = document.querySelector('.detail-book__info-lang');
    const tagBookYear = document.querySelector('.detail-book__info-year');
    const updateBtn = document.querySelector('.detail-book__btn--update'); 
    const favoriteBtn = document.querySelector('.detail-book__btn--favorite');
    const trashBtn = document.querySelector('.detail-book__btn--trash');
    const prevBtn = document.querySelector('.detail-book__prev-btn');
    const allBookLi = document.querySelectorAll('.main-menu__books-item');

    const params = (new URL(document.location)).searchParams; 
    const bookId = params.get('bookid');
    const userToken = JSON.parse(localStorage.getItem('bookDataCurrentUser'));

    prevBtn?.addEventListener('click', () => {
        window.history.pushState({}, '', 'main-menu');
        closeAllPage();
        loadFuncPath();

        mainMenu();
        // window.history.back();
    })

    const currentBook = getRq(`http://localhost:1717/books/${bookId}`, userToken)
    .then(book => {

        tagBookname.textContent = book.name;
        tagBookAuthor.textContent = book.author;
        tagBookHouse.textContent = book.publishHouse;
        tagBookLang.textContent = book.originalLanguage;
        tagBookYear.textContent = book.publishYear;
        tagBookPages.textContent = book.pagesNumber;
        tagBookGenre.textContent = book.genres.join(', ');


        book.isFavorite ? favoriteBtn.classList.add('btn-add-fovarite--true') :
        favoriteBtn.classList.remove('btn-add-fovarite--true')

        updateBtn.addEventListener('click', () => {
            updateBook(book)
        });

        favoriteBtn?.addEventListener('click', () => {
            toggleFavorite(book, favoriteBtn, userToken);
        })

        trashBtn?.addEventListener('click', () => {
            deleteBook(`http://localhost:1717/books/delete/${book.id}`, userToken);
            const tagBook = Array.from(allBookLi)?.find(elem => elem.dataset.bookId == book.id);
            if(tagBook) tagBook.remove();
            window.history.pushState({}, '', 'main-menu');
            mainMenu();
            closeAllPage();
            loadFuncPath();
        })
    })

    tagDetailBook.classList.remove('d-none')

}