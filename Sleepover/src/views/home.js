import { html } from '../lib/lit-html.js';

const homeTemplate = () => html`
<h1>Welcome to Joro's SleepOver!</h1>
<p>Find accomodation in many locations across the globe. <a href="/rooms">Browse our catalog</a></p>
<p>Have a room to affer? <a href="/host">Place an ad right now!</a></p>`;

export function showHome(ctx){
    ctx.render(homeTemplate());
    
}