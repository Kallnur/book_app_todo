import { newUserObj } from "../constructor/constructor";
import { postRq } from "../utils/rqServer";
import { clearValueInputs, closeAllPage, loadFuncPath } from "../utils/util";
import { signValidate, validateNameAge } from "../utils/validate/validate";
import { mainMenu } from "./mainMenu";

export const signUp = () => {
    window.history.pushState({}, '', 'sign-up');

    const loginPage = document.querySelector('.login');
    const tagUserName = document.querySelector('#sign-up-name');
    const tagUSerPassword = document.querySelector('#sign-up-password');
    const tagUserRepassword = document.querySelector('#sign-up-repassword');
    const tagSignBtn = document.querySelector('#sign-up-btn');
    const tagFormSign = document.querySelector('.login__form');
    const tagUserAge = document.querySelector('#sign-up-age');
    const tagFirstName = document.querySelector('#sign-up-firstName');

    loginPage.classList.remove('d-none');
    loginPage.classList.replace('login--sign-in', 'login--sign-up');

    tagSignBtn?.addEventListener('click', (e) => {
        e.preventDefault()

        const validAge = validateNameAge(tagUserAge, tagFirstName);

        const valid = signValidate(tagUserName, tagUSerPassword, tagUserRepassword);

        if(valid && validAge) {
            const userObj = newUserObj(tagUserName.value, tagUSerPassword.value, tagFirstName.value, tagUserAge.value);
            
            const response = postRq('http://localhost:1717/signin', userObj)
            .then(data => {
                if(data) {
                    localStorage.setItem('bookDataCurrentUser', JSON.stringify(data.token));
                    mainMenu(data.token);
                    window.history.pushState({}, '', 'main-menu');
                    closeAllPage();
                    loadFuncPath();
                }
            })

            clearValueInputs(tagFormSign)
        }
    })
}