import { userObj } from "../constructor/constructor";
import { postRq } from "../utils/rqServer";
import { inputShowWarn, linkFunc } from "../utils/util";
import { signValidate, validateName, validatePassword } from "../utils/validate/validate";

export const signIn = () => {
    window.history.pushState({}, '', 'sign-in');

    const tagUserPassword = document.querySelector('#sign-in-password');
    const tagUserName = document.querySelector('#sign-in-name');
    const tagSignBtn = document.querySelector('#sign-in-btn');
    const loginPage = document.querySelector('.login');

    loginPage.classList.remove('d-none');
    loginPage.classList.replace('login--sign-up', 'login--sign-in');

    tagSignBtn?.addEventListener('click', (e) => {

        const valid = signValidate(tagUserName, tagUserPassword)

        if(valid) getAuth(e, tagUserName.value, tagUserPassword.value);
    })

    function getAuth(e, name, password) {
        const userData = userObj(name, password);

        const response = postRq('http://localhost:1717/login', userData)
        .then(data => {
            if(data) {
                localStorage.setItem('bookDataCurrentUser', JSON.stringify(data.token))

                window.history.pushState({}, '', 'main-menu')
                linkFunc(e);

            } else {
                const nameMessSpan = tagUserName.closest('div').querySelector('span');
                inputShowWarn(tagUserName, nameMessSpan, 'Пользователь не найден или неверный пароль')
            }
        })
    }
}