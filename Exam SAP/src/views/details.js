import { deleteById, getById, getOwnLikes, getTotalLikes, addLike } from '../api/data.js';
import { html, nothing } from '../lib.js';

const detailsTemplate = (item, totalLikes, hasUser, isOwner, canLike, onDelete, onLike) => html`
<section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          
          <div id="img-wrapper">
            <img src=${item.imageUrl} alt="example1" />
          </div>
          
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${item.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
          </div>
          
          <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

          ${buttonControl(item, hasUser, isOwner, canLike, onDelete, onLike)}
          
        </div>
</section>`;

function buttonControl(item, hasUser, isOwner, canLike, onDelete, onLike){

  if (hasUser == false){
    return nothing;
  }

  if(isOwner){
    return html`
    <div id="action-buttons">
      <a href="/edit/${item._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`;
  }

  if(canLike){
    return html`
    <div id="action-buttons">
      <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
    </div>`;
  }

}

 
export async function showDetails(ctx){

    const id = ctx.params.id;

    const requests = [
      getById(id),
      getTotalLikes(id)
    ];

    const hasUser = Boolean(ctx.user);

    if (hasUser){
      requests.push(getOwnLikes(id, ctx.user._id));
    }

    const [item, totalLikes, didLike] = await Promise.all(requests)
    
    const isOwner = hasUser && item._ownerId == ctx.user._id;
    const canLike = !isOwner && didLike == 0;

    ctx.render(detailsTemplate(item, totalLikes, hasUser, isOwner, canLike, onDelete, onLike));

    async function onDelete(){

        let choice = confirm('Are you sure you want to delete this item?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike(){
      await addLike(id);
      ctx.page.redirect('/details/' + id);
    }
}

