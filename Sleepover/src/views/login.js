import { login } from '../data/user.js';
import { submitHandler } from '../data/util.js';
import { html } from '../lib/lit-html.js';

const loginTemplate = (onLogin) => html`
<h2>Login</h2>
<form @submit=${onLogin} class="submit-form">
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Login</button>
</form>`;

export async function showLogin(ctx){
    ctx.render(loginTemplate(submitHandler(onLogin)));

    async function onLogin({email, password}){
        if(email == '' || password == ''){
            return alert('Please try again!');
        }

        await login(email, password);

        ctx.page.redirect('/');
        
    }
}