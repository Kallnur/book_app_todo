import { mainMenu } from "../contentFunc/mainMenu";
import { deleteBook, putRq } from "../utils/rqServer"
import { deleteBookFunc, toggleFavorite } from "../utils/util";

const userToken = JSON.parse(localStorage.getItem('bookDataCurrentUser'));

export const userObj = (name, password) => {
    return {
        username: name,
        password: password
    }
}

export const newUserObj = (name, password, firstName, age) => {
    return {
        username: name,
        password: password,
        firstName: firstName,
        age: age
    }
}

export const newBook = (name, author, year, house, pages, genres, lang) => {
    return {
        name: name,
        author: author,
        isFavorite: false,
        publishYear: +year,
        publishHouse: String(house),
        pagesNumber: +pages,
        genres: genres,
        originalLanguage: lang
    }
}

export const renderNewBook = (book) => {
    const newLi = document.createElement('li');
    const bookInfoBlock = document.createElement('div');
    const bookLink = document.createElement('a');
    const bookAuthor = document.createElement('strong');
    const bookBtnsBlock = document.createElement('div');
    const favoriteBtn = document.createElement('button');
    const trashBtn = document.createElement('button');
    const favoriteIcon = document.createElement('img');
    const activeFavoriteIcon = document.createElement('img');
    const trashIcon = document.createElement('img');

    newLi.dataset.bookId = book.id;
    newLi.classList.add('main-menu__books-item')
    bookInfoBlock.classList.add('main-menu__books-info')
    bookLink.classList.add('main-menu__books-name', 'app-link')
    bookAuthor.classList.add('main-menu__books-author')
    bookBtnsBlock.classList.add('main-menu__books-btns')
    favoriteBtn.classList.add('main-menu__books-btn', 'btn-add-fovarite')
    trashBtn.classList.add('main-menu__books-btn', 'btn-delete-book')

    book.isFavorite ? favoriteBtn.classList.add('btn-add-fovarite--true') :
    favoriteBtn.classList.remove('btn-add-fovarite--true')

    bookLink.textContent = book.name;
    bookAuthor.textContent = book.author;
    
    favoriteIcon.src = './assets/icons/heard.svg';
    activeFavoriteIcon.src = './assets/icons/redHeard.svg';
    trashIcon.src = './assets/icons/basket.svg';
    bookLink.href = `detail-book?bookid=${book.id}`;

    trashBtn?.addEventListener('click', () => {

        deleteBookFunc(book, userToken, false, newLi)
    })

    favoriteBtn?.addEventListener('click', () => {
        toggleFavorite(book, favoriteBtn, userToken)
    })

    favoriteBtn.append(favoriteIcon, activeFavoriteIcon);
    trashBtn.append(trashIcon);
            
    bookInfoBlock.append(bookLink, bookAuthor);
    bookBtnsBlock.append(favoriteBtn, trashBtn);

    newLi.append(bookInfoBlock, bookBtnsBlock);
    
    return newLi;
}