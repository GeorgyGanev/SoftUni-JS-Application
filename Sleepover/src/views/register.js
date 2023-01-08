import { register } from '../data/user.js';
import { submitHandler } from '../data/util.js';
import { html } from '../lib/lit-html.js';


const registerTemplate = (onRegister) => html`
    <h2>Register</h2>
    <form @submit=${onRegister}>
        <label>Email: <input type="text" name="email"></label>
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeate: <input type="password" name="repass"></label>
        <button>Register</button>
    </form>`;


export function showRegister(ctx){
    ctx.render(registerTemplate(submitHandler(onRegister)));

    async function onRegister({email, username, password, repass}){
        if ([email, username, password].some(e => e == '')){
            return alert('All fields are required');
        }

        if (password !== repass){
            return alert('Passwords do not match!');
        }

        await register(email, username, password);

        ctx.page.redirect('/');
    }
}
