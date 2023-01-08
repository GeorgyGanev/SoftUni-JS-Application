import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('nav');

const navTemplate = (user) => html`
 <div>
    <a href="/dashboard">Dashboard</a>
</div>


${user ? html`<div class="user">
    <a href="/create">Add Album</a>
    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
</div>`
    : html`<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}`;

export function updateNav(){
    const user = getUserData();
    render(navTemplate(user), nav);
}

function onLogout(){
    logout();
    updateNav();
    page.redirect('/dashboard');
}

