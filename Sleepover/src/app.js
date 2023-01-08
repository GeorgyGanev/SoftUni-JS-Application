import page from './lib/page.mjs'; 
import { getUserData } from './data/util.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addUserNav } from './middlewares/userNav.js';
import { createView } from './views/create.js';
import { showLogin } from './views/login.js';
import { catalogView } from './views/catalog.js';
import { showRegister } from './views/register.js';
import { navTemplate } from './views/nav.js';
import { showHome } from './views/home.js';
import { logoutAction } from './views/logout.js';
import { preloadRoom } from './middlewares/preloader.js';
import { hasUser, isOwner } from './middlewares/guards.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate));

page('/', showHome);
page('/rooms', catalogView);
page('/host', hasUser(), createView);
page('/rooms/:id', preloadRoom('id'), showDetails);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', logoutAction);
page('/edit/:id', preloadRoom('id'), isOwner(), showEdit)

page.start();




 