import { routeRul } from "./route/routeRul";
import { signIn } from "./contentFunc/login";
import { mainMenu } from "./contentFunc/mainMenu";

import '../sass/main.sass'

routeRul();

const currentUser = JSON.parse(localStorage.getItem('bookDataCurrentUser'));

console.log(currentUser);

if(currentUser) mainMenu(currentUser)

else signIn();
