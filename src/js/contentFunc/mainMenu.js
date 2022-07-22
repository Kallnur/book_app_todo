import { renderNewBook } from "../constructor/constructor";
import { addBook } from "../modalFunc/addBook";
import { routeRul } from "../route/routeRul";
import { getRq } from "../utils/rqServer";
import { signOut } from "./signOut";

export const mainMenu = (token) => {
    window.history.pushState({}, '', 'main-menu');

    const tagMainMenu = document.querySelector('.main-menu');
    const tagUserName = document.querySelector('.main-menu__user-name');
    const tagBookList = document.querySelector('.main-menu__books-list');
    const addBookBtn = document.querySelector('.add-book-btn');
    const signOutBtn = document.querySelector('.btn-sign-out');
    const textNotBook = document.querySelector('.main-menu__books-not');

    const tagBooks = tagBookList.children;

    tagMainMenu.classList.remove('d-none')

    let userToken = token;

    if(!userToken) {
        userToken = JSON.parse(localStorage.getItem('bookDataCurrentUser'));
    }
    
    if(tagBooks.length == 1) tagBooks[0].style.width = '100%';

    getRq('http://localhost:1717/me', userToken)
    .then(user => tagUserName.textContent = user.username)

    const allBooks = getRq('http://localhost:1717/books', userToken)
    .then(data => {
        data.forEach((book, index, arr) => {
            const trueBook = Array.from(tagBooks).find(elem => elem.dataset.bookId == book.id);

            if(!trueBook){
                const newTagBook = renderNewBook(book);
                if(arr.length == 1) newTagBook.style.width = '100%';
                tagBookList.append(newTagBook);
                
            }
        })
        !data.length ? textNotBook.classList.remove('d-none') : textNotBook.classList.add('d-none')
        
        routeRul();
    })

    addBookBtn?.addEventListener('click', addBook);

    signOutBtn?.addEventListener('click', signOut);

}