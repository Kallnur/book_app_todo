import { routeRul } from "../route/routeRul";
import { closeAllPage, linkFunc, loadFuncPath } from "../utils/util";
import { signIn } from "./login";

export const signOut = () => {

    window.history.pushState({}, '', 'sign-in');

    closeAllPage();
    loadFuncPath();

    localStorage.removeItem('bookDataCurrentUser');
}