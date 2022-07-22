import { detailBook } from "../contentFunc/detailBook";
import { signIn } from "../contentFunc/login";
import { mainMenu } from "../contentFunc/mainMenu";
import { signUp } from "../contentFunc/signUp";

export const pathRul = [
    {
        path: 'sign-in',
        func: signIn
    },
    {
        path: 'sign-up',
        func: signUp
    },
    {
        path: 'main-menu',
        func: mainMenu
    },
    {
        path: 'detail-book',
        func: detailBook
    }
]