import { linkFunc, loadFuncPath } from "../utils/util";
import { pathRul } from "./routeObj";

export const routeRul = () => {

    const allLinks = document.querySelectorAll('.app-link');

    Array.from(allLinks)?.forEach( a => { a.addEventListener('click', linkFunc) } )

    window.addEventListener('popstate', loadFuncPath);

}