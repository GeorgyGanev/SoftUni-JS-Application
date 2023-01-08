import { html  } from '../lib/lit-html.js';
import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js';
import { classMap } from '../lib/directives/class-map.js'

const catalogTemplate = (list) => html`
    <h1>Available Rooms</h1>
    ${list}`;

const listTemplate = (rooms) => html`
<section>
    ${repeat(rooms, r => r.objectId, roomCard)}
</section>`;

const roomCard = (room) => html`
    <article class=${classMap({'room-card':true, 'own-room':room.isOnwer})}>
        <h3>${room.name}</h3>
        <p>Location: ${room.location}</p>
        <p>Beds: ${room.beds}</p>
        <p><a class="action" href="/rooms/${room.objectId}">View Details</a></p>
        <p>Hosted by ${room.owner.username}</p>
    </article>`; 

export async function catalogView(ctx){
    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`));

    const {results: rooms} = await roomService.getAll(ctx.user?.objectId);

    if (ctx.user){
        rooms.forEach(r => r.isOnwer = ctx.user.objectId == r.owner.objectId);
    }

    ctx.render(catalogTemplate(listTemplate(rooms)));
}