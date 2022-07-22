import { mainMenu } from "../contentFunc/mainMenu";
import { pathRul } from "../route/routeObj";
import { deleteBook, putRq } from "./rqServer";

export const loadFuncPath = () => {
    pathRul.forEach(obj => { 
        if( window.location.href.includes(obj.path) ) obj.func(); 
    })
}

export const closeAllPage = () => {
    const allPage = document.querySelectorAll('.page');
    Array.from(allPage).forEach(elem => elem.classList.add('d-none'))
}

export const linkFunc = (e) => {
    e.preventDefault();

    if(e.target.href){
        const linkPath = e.target.href;
        window.history.pushState({}, '', linkPath);
    }

    closeAllPage();
    loadFuncPath();
}

export const inputShowWarn = (input, span, messErr) => {
    input.closest('div').classList.add('login__input-block--warn');
    span.textContent = messErr;
}

export const inputHideWarn = (input, span) => {
    input.closest('div').classList.remove('login__input-block--warn');
    span.textContent = '';
}

export const clearValueInputs = (form) => {
    const allInputs = form.querySelectorAll('input');

    Array.from(allInputs).forEach(elem => elem.value = '');
}

export const closeModal = (modal) => {
    const modalContent = modal.querySelector('.modal__body');

    modal?.addEventListener('click', () => {
        modal.classList.remove('modal-add-book--active');
    })
    
    modalContent?.addEventListener('click', (e) => e.stopPropagation())
}

export const toggleFavorite = (book, favoriteBtn, userToken) => {
    if(book.isFavorite) {
        favoriteBtn.classList.remove('btn-add-fovarite--true');
        book.isFavorite = false;
    }
    else {
        book.isFavorite = true;
        favoriteBtn.classList.add('btn-add-fovarite--true');
    }

    putRq(`http://localhost:1717/books/update/${book.id}`, {isFavorite: book.isFavorite}, userToken)
}

export const deleteBookFunc = (book, userToken, allBookLi, newLi) => {
    const modalDelete = document.querySelector('.modal-delete-book');
    modalDelete.classList.remove('d-none');
    const deleteBtn = document.querySelector('.modal-delete-btn');
    const notDeleteBtn = document.querySelector('.modal-not-delete-btn');

    deleteBtn?.addEventListener('click', () => {
        if(allBookLi) deleteDeteilBook()
        if(newLi) deleteMiniBook()
    })

    function deleteDeteilBook () {
        deleteBook(`http://localhost:1717/books/delete/${book.id}`, userToken);
        const tagBook = Array.from(allBookLi)?.find(elem => elem.dataset.bookId == book.id);
        if(tagBook) tagBook.remove();
    
        window.history.pushState({}, '', 'main-menu');
        mainMenu();
        closeAllPage();
        loadFuncPath();
        modalDelete.classList.add('d-none');
    }

    function deleteMiniBook() {
        deleteBook(`http://localhost:1717/books/delete/${book.id}`, userToken);
        mainMenu();
        newLi.remove();

        modalDelete.classList.add('d-none');
    }

    notDeleteBtn?.addEventListener('click', () => {
        modalDelete.classList.add('d-none');
    })

}
