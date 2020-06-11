import { auth } from '../firebaseInit.js';


const dropdownDots = (idPost, idUser) => {
  // console.log(auth.currentUser.uid, idUser);
  const drop = `
  <div class="dropdown ">
    <i class="bx bx-dots-horizontal-rounded setting-post ${auth.currentUser.uid === idUser ? '' : 'hidden'}" post-id='${idPost}'></i>
    <ul class="dropdown-menu right hidden" id="dots-1">
      <li id="edit"> <i class='bx bxs-edit' ></i>Editar</li>
      <li id="delete"><i class='bx bxs-trash'></i>Eliminar</li>
    </ul>
  </div> `;
  return drop;
};

const getAllComments = (comments) => {
  let allComments = '';
  comments.forEach((com) => {
    allComments += ` 
      <div class="comment-created">
        <img src="${com.userPhoto}" class="post-user-photo">
        <span class="comment-text"> 
          <span class="name-user"> ${com.userName}</span>
          ${com.text}
        </span>
      </div>`;
  });
  return allComments;
};


export const post = (postObj, postId) => {
  const divPost = `
    <div class="post-header border">
      <img src="${postObj.photoUser}" class="icon-photo-user">       
      <div class="name-date-post">
        <div>
          <span class="name-user">${postObj.nameUser}</span>
          ${dropdownDots(postId, postObj.idUser)}
        </div>
        <small>${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}</small>
        <i class='bx bx-world'></i>
      </div>   
    </div>

    <div class="post-body border"> 
      <p class="text-post-value"> ${postObj.textContent}</p>
      ${(postObj.imagesContent[0] ? `<img src="${postObj.imagesContent[0]}"></img>` : '')}      
    </div>
    <div class="post-likes border">
    <span id="num-likes" class="quantity-icon">${postObj.likes}
      <i class="fa fa-heart cursor" aria-hidden="true"></i>
    </span>
    <span id="num-comments" class="quantity-icon">${postObj.comments.length}
      <i class="fa fa-comment-o cursor" aria-hidden="true"></i>
    </span>
    </div>
    <div class="post-comments ">    
      <div class="create-comment-container border">
        <img src="${postObj.photoUser}" class="post-user-photo">
        <textarea type="text" class="input-comment" placeholder="Escribre un comentario"></textarea>
      </div>
      ${getAllComments(postObj.comments)}
    </div>`;

  return divPost;
};
