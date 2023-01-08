import { getAll } from '../api/data.js';
import { html } from '../lib.js';

const dashboardTemplate = (list) => html`
<section id="dashboard">
    <h2>Albums</h2>

        ${list.length == 0 ? html`<h2>There are no albums added yet.</h2>`
            : html`
            <ul class="card-wrapper">
                ${list.map(item => cardTemplate(item))}
            </ul>`}
    
</section>`;

const cardTemplate = (item) => html`
    <li class="card">
        <img src=${item.imageUrl} />
        <p>
            <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
        </p>
        <p>
            <strong>Album name: </strong><span class="album">${item.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </li>`;

export async function showDashboard(ctx) {

    const list = await getAll();

    ctx.render(dashboardTemplate(list));
}
